const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.guardarScore = functions.https.onRequest(async (req, res) => {
  const { nombre, puntos } = req.body;

  if (!nombre || !puntos) {
    return res.status(400).send('Faltan datos');
  }

  await db.collection('scores').add({
    nombre,
    puntos,
    fecha: new Date()
  });

  res.status(200).send('Score guardado');
});
