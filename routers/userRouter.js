// userRouter.js
import express from 'express';
import postgresClient from '../config/db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const text = "INSERT INTO tasks (task, date) VALUES ($1, $2) RETURNING *";
    const values = [req.body.task, req.body.date];
    const result = await postgresClient.query(text, values);
    console.log(result);
    return res.status(200).json({ message: "Görev başarıyla eklendi." });
  } catch (error) {
    console.error('Hata oluştu:', error.message);
    return res.status(400).json({ message: "Verileri eklerken hata oluştu." });
  }
});

router.get('/', async (req, res) => {
  try {
    const text = "SELECT * FROM tasks";
    const result = await postgresClient.query(text);
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Hata oluştu:', error.message);
    return res.status(500).json({ message: 'Verileri alırken hata oluştu.' });
  }
});

router.delete('/:task', async (req, res) => {
  try {
    const taskToDelete = req.params.task;
    const text = "DELETE FROM tasks WHERE task = $1";
    const values = [taskToDelete];
    const result = await postgresClient.query(text, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Silinecek görev bulunamadı." });
    }

    return res.status(200).json({ message: "Görev başarıyla silindi." });
  } catch (error) {
    console.error('Hata oluştu:', error.message);
    return res.status(400).json({ message: "Verileri silerken hata oluştu." });
  }
});

router.put('/:task', async (req, res) => {
  try {
    const taskToUpdate = req.params.task;
    const { task, date } = req.body;

    const text = "UPDATE tasks SET task = $1, date = $2 WHERE task = $3 RETURNING *";
    const values = [task, date, taskToUpdate];
    const result = await postgresClient.query(text, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Güncellenecek görev bulunamadı." });
    }

    return res.status(200).json({ message: "Görev başarıyla güncellendi." });
  } catch (error) {
    console.error('Hata oluştu:', error.message);
    return res.status(400).json({ message: "Verileri güncellerken hata oluştu." });
  }
});


export default router;
