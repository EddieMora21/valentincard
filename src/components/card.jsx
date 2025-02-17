import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

// Componente individual de tarjeta de amor
const LoveCard = ({ cardData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Función para manejar los clics en la tarjeta
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

  // Estilos de la tarjeta, combinando estilos comunes con los personalizados
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

// Validación de props para LoveCard
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
  }).isRequired,
};

// Componente que agrupa diferentes tarjetas de amor
const ValentineCards = () => {
  // Array de objetos con datos y estilos personalizados para cada tarjeta
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
      headingColor: "#c54b6e",
      textColor: "#5a3d3d",
      message:
        "Aunque la distancia nos separe, mi amor por ti sigue intacto. Cada mensaje tuyo es un abrazo que me llega al corazón.",
      waxSealIcon: "💌",
      footerMessage: "Pronto estaremos juntos.",
      footerColor: "#c54b6e",
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
  ];

  // Estilos para agrupar las tarjetas en un contenedor tipo grid
  const gridStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    gap: "20px",
  };

  return (
    <div style={gridStyles}>
      {cardsData.map((card) => (
        <LoveCard key={card.id} cardData={card} />
      ))}
    </div>
  );
};

export default ValentineCards;
