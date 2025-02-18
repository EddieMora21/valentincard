import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import M from "../assets/m.jpeg";

// Componente individual de tarjeta de amor
const LoveCard = ({ cardData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setClickCount(0);
    } else {
      setClickCount((prevCount) => {
        const newCount = prevCount + 1;
        if (newCount === 3) {
          setIsOpen(false);
          return 0;
        }
        return newCount;
      });
    }
  };

  const styles = {
    envelope: {
      position: "relative",
      width: "min(90%, 300px)",
      height: "400px",
      cursor: "pointer",
      perspective: "1000px",
      margin: "20px",
    },
    envelopeFront: {
      position: "absolute",
      width: "100%",
      height: "100%",
      background: cardData.envelopeColor || "#ff4d6d",
      borderRadius: "8px",
      transformOrigin: "top center",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      overflow: "hidden",
    },
    letterPaper: {
      position: "absolute",
      width: "100%",
      height: "100%",
      background: cardData.letterBackground || "white",
      borderRadius: "8px",
      padding: "2rem",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    },
    waxSeal: {
      position: "absolute",
      bottom: "20px",
      right: "20px",
      background: cardData.waxSealColor || "#c54b6e",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    },
  };

  return (
    <motion.div
      style={styles.envelope}
      onClick={handleClick}
      layout
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      {/* Parte frontal del sobre */}
      <motion.div
        style={styles.envelopeFront}
        animate={{
          rotateX: isOpen ? -180 : 0,
          zIndex: isOpen ? 0 : 2,
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: "-30px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "3rem",
            filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
          }}
          animate={{ rotate: isOpen ? 0 : [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {cardData.icon || "❤️"}
        </motion.div>
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "white",
            padding: "5px 10px",
            borderRadius: "4px",
            color: cardData.envelopeColor || "#ff4d6d",
          }}
        >
          {cardData.signature || "Mi amor"}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            color: "white",
            fontSize: "1.2rem",
            textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
          }}
        >
          {cardData.subtitle || "De mi para ti"}
        </div>
      </motion.div>

      {/* Contenido de la carta */}
      <motion.div
        style={styles.letterPaper}
        animate={{ opacity: isOpen ? 1 : 0 }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              style={{
                height: "100%",
                overflowY: "auto",
                paddingRight: "10px",
              }}
            >
              <h1
                style={{
                  color: cardData.headingColor || "#c54b6e",
                  marginBottom: "1rem",
                  borderBottom: "2px solid #f5d5d5",
                  paddingBottom: "0.5rem",
                }}
              >
                {cardData.title || "Para ti, mi amor"}
              </h1>

              {/* Si la carta tiene la propiedad "image", se muestra la imagen */}
              {cardData.image && (
                <motion.img
                  src={cardData.image}
                  alt="Imagen de amor"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                  }}
                />
              )}

              <motion.p
                style={{
                  lineHeight: "27px",
                  color: cardData.textColor || "#5a3d3d",
                  marginBottom: "1rem",
                  fontSize: "1.2rem",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {cardData.message ||
                  "Tu amor me llena de vida y cada día te extraño un poco más."}
              </motion.p>

              <motion.div
                style={styles.waxSeal}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span style={{ color: "white", fontSize: "1.2rem" }}>
                  {cardData.waxSealIcon || "💌"}
                </span>
              </motion.div>

              <motion.div
                style={{
                  marginTop: "2rem",
                  color: cardData.footerColor || "#c54b6e",
                  fontSize: "1.1rem",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {cardData.footerMessage || "Siempre te llevo en mi corazón."}
              </motion.div>

              <motion.div
                style={{
                  textAlign: "center",
                  margin: "1rem 0",
                  fontSize: "2rem",
                  opacity: 0.8,
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                {cardData.footerIcon || "💞"}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

LoveCard.propTypes = {
  cardData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    envelopeColor: PropTypes.string,
    letterBackground: PropTypes.string,
    waxSealColor: PropTypes.string,
    icon: PropTypes.string,
    signature: PropTypes.string,
    subtitle: PropTypes.string,
    title: PropTypes.string,
    headingColor: PropTypes.string,
    textColor: PropTypes.string,
    message: PropTypes.string,
    waxSealIcon: PropTypes.string,
    footerMessage: PropTypes.string,
    footerColor: PropTypes.string,
    footerIcon: PropTypes.string,
    image: PropTypes.string, // Nueva propiedad para la imagen
  }).isRequired,
};

const ValentineCards = () => {
  const cardsData = [
    {
      id: 1,
      envelopeColor: "#ff4d6d",
      letterBackground: "white",
      waxSealColor: "#c54b6e",
      icon: "❤️",
      signature: "Mi bb",
      subtitle: "De mi para ti :3",
      title: "Para la más hermosa",
      headingColor: "#c54d6e",
      textColor: "#5a3d3d",
      message:
        "Aunque la distancia nos separe, mi amor por ti sigue intacto. Cada mensaje tuyo es un abrazo que me llega al corazón.",
      waxSealIcon: "💌",
      footerMessage: "Pronto estaremos juntos.",
      footerColor: "#c54d6d",
      footerIcon: "💞",
    },
    {
      id: 2,
      envelopeColor: "#4d79ff",
      letterBackground: "#e6ecff",
      waxSealColor: "#2e54ff",
      icon: "💙",
      signature: "Corazón",
      subtitle: "Desde lejos, te amo",
      title: "A mi amor eterno",
      headingColor: "#2e54ff",
      textColor: "#1a2a6c",
      message:
        "La distancia solo refuerza el deseo de tenerte cerca. Cada amanecer me recuerda que eres mi sol, mi refugio y mi alegría.",
      waxSealIcon: "💌",
      footerMessage: "Contando los días para verte.",
      footerColor: "#2e54ff",
      footerIcon: "💙",
    },
    {
      id: 3,
      envelopeColor: "#ff944d",
      letterBackground: "#fff2e6",
      waxSealColor: "#ff6f00",
      icon: "🔥",
      signature: "Tesoro",
      subtitle: "Te extraño",
      title: "A mi fuego interior",
      headingColor: "#ff6f00",
      textColor: "#bf360c",
      message:
        "Cada kilómetro que nos separa es un recordatorio de la intensidad de mi amor por ti. Eres mi pasión y mi inspiración, incluso a la distancia.",
      waxSealIcon: "💌",
      footerMessage: "Nuestro amor arde con fuerza.",
      footerColor: "#ff6f00",
      footerIcon: "🔥",
    },
    {
      id: 4,
      envelopeColor: "#8e44ad",
      letterBackground: "#f3e5f5",
      waxSealColor: "#6a1b9a",
      icon: "💜",
      signature: "Amor Mío",
      subtitle: "Siempre en mi mente",
      title: "Un amor que trasciende",
      headingColor: "#6a1b9a",
      textColor: "#4a148c",
      message:
        "La distancia física no puede competir con la cercanía de nuestro corazón. Te llevo en cada pensamiento, en cada latido.",
      waxSealIcon: "💌",
      footerMessage: "Nuestro lazo es eterno.",
      footerColor: "#6a1b9a",
      footerIcon: "💜",
    },
    {
      id: 5,
      envelopeColor: "#27ae60",
      letterBackground: "#e8f5e9",
      waxSealColor: "#1e8449",
      icon: "💚",
      signature: "Mi Vida",
      subtitle: "A la distancia, unidos",
      title: "Amor sin fronteras",
      headingColor: "#1e8449",
      textColor: "#145a32",
      message:
        "Cada mensaje, cada llamada, me acerca a ti. Aunque estemos lejos, mi amor crece cada día más.",
      waxSealIcon: "💌",
      footerMessage: "Contigo, la distancia se desvanece.",
      footerColor: "#1e8449",
      footerIcon: "💚",
    },
    {
      id: 6,
      envelopeColor: "#e74c3c",
      letterBackground: "#fce4ec",
      waxSealColor: "#d81b60",
      icon: "💖",
      signature: "Corazoncito",
      subtitle: "Siempre en mi mente",
      title: "Amor que florece",
      headingColor: "#d81b60",
      textColor: "#ad1457",
      message:
        "Cada día que pasa, mi amor por ti crece más y florece en cada rincón de mi alma.",
      waxSealIcon: "💌",
      footerMessage: "Eres mi eterno jardín.",
      footerColor: "#d81b60",
      footerIcon: "🌹",
    },
    {
      id: 7,
      envelopeColor: "#16a085",
      letterBackground: "#e0f7fa",
      waxSealColor: "#00897b",
      icon: "💚",
      signature: "Mi Alma",
      subtitle: "Unidos por siempre",
      title: "Caminos que se encuentran",
      headingColor: "#00897b",
      textColor: "#00695c",
      message:
        "Aunque nuestros caminos sean distintos, el destino nos unió en este hermoso viaje del amor.",
      waxSealIcon: "💌",
      footerMessage: "Juntos en cada paso.",
      footerColor: "#00897b",
      footerIcon: "🌿",
    },
    {
      id: 8,
      envelopeColor: "#f1c40f",
      letterBackground: "#fffde7",
      waxSealColor: "#f39c12",
      icon: "💛",
      signature: "Mi Sol",
      subtitle: "Iluminando mi vida",
      title: "Luz en la oscuridad",
      headingColor: "#f39c12",
      textColor: "#f57f17",
      message:
        "Tu sonrisa ilumina mis días y convierte la rutina en un sueño lleno de color.",
      waxSealIcon: "💌",
      footerMessage: "Brillamos juntos.",
      footerColor: "#f39c12",
      footerIcon: "☀️",
    },
    {
      id: 9,
      envelopeColor: "#9c27b0",
      letterBackground: "#f3e5f5",
      waxSealColor: "#8e24aa",
      icon: "💜",
      signature: "Mi Encanto",
      subtitle: "Eres mi magia",
      title: "Un hechizo de amor",
      headingColor: "#8e24aa",
      textColor: "#6a1b9a",
      message:
        "Cada instante contigo es como vivir un sueño encantado donde el amor se vuelve magia pura.",
      waxSealIcon: "💌",
      footerMessage: "Nuestro lazo es de otro mundo.",
      footerColor: "#8e24aa",
      footerIcon: "✨",
    },
    {
      id: 10,
      envelopeColor: "#2980b9",
      letterBackground: "#eaf2f8",
      waxSealColor: "#2471a3",
      icon: "💙",
      signature: "Mi Estrella",
      subtitle: "Siempre en mi cielo",
      title: "Amor sin límites",
      headingColor: "#2471a3",
      textColor: "#1c5980",
      message:
        "Tu presencia en mi vida es como la brisa fresca en un día caluroso, refrescante y llena de amor.",
      waxSealIcon: "💌",
      footerMessage: "Contigo, todo es posible.",
      footerColor: "#2471a3",
      footerIcon: "⭐",
    },
  ];

  // Seleccionar 4 índices aleatorios para asignarles una imagen
  const randomIndices = [];
  while (randomIndices.length < 4) {
    const index = Math.floor(Math.random() * cardsData.length);
    if (!randomIndices.includes(index)) {
      randomIndices.push(index);
    }
  }

  // Se agregará la propiedad "image" a las cartas seleccionadas
  const updatedCardsData = cardsData.map((card, index) =>
    randomIndices.includes(index)
      ? {
          ...card,
          image: M,
        }
      : card
  );

  const gridStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    gap: "20px",
    position: "relative",
    zIndex: 2,
  };

  return (
    // Contenedor sin imagen de fondo (solo un color plano)
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#f8f8f8",
      }}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div style={gridStyles}>
          {updatedCardsData.map((card) => (
            <LoveCard key={card.id} cardData={card} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ValentineCards;
