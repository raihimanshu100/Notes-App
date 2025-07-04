
import Note from '../models/Note.js';

export const getNotes = async (req, res) => {
  const userId = req.session?.user?.id;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const notes = await Note.find({ userId }).sort({ createdAt: -1 });
  res.status(200).json(notes);
};

export const addNote = async (req, res) => {
  const userId = req.session?.user?.id;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const { content } = req.body;
  const note = new Note({ userId, content });
  await note.save();
  res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  const userId = req.session?.user?.id;
  const { id } = req.params;

  const deleted = await Note.findOneAndDelete({ _id: id, userId });
  if (!deleted) return res.status(404).json({ message: 'Note not found' });

  res.status(200).json({ message: 'Note deleted' });
};
