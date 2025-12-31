export const healthz = async (req, res) => {
  try {
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(200).json({ ok: false });
  }
};
