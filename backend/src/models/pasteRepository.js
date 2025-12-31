import Paste from "./paste.js";

export async function addNewPaste(data) {
  console.log(data)
  return new Paste(data).save();
}

export async function findPasteById(id) {
  return Paste.findById(id);
}

export async function incrementViews(id) {
  return Paste.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
}
