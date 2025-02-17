import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ValentineCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Función para manejar los clics:
  const handleClick = () => {
    if (!isOpen) {
      // Si la carta está cerrada, se abre y se resetea el contador
      setIsOpen(true);
      setClickCount(0);
    } else {
      // Si la carta ya está abierta, se incrementa el contador
      setClickCount((prevCount) => {
        const newCount = prevCount + 1;
        // Cuando se llega a 3 clics, se cierra la carta y se resetea el contador
        if (newCount === 3) {
          setIsOpen(false);
          return 0;
        }
        return newCount;
      });
    }
  };

  // Estilos comunes sin fuente cursiva
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(45deg, #ff758c, #ff7eb3)",
      padding: "20px",
    },
    envelope: {
      position: "relative",
      width: "min(90%, 400px)",
      height: "500px",
      cursor: "pointer",
      perspective: "1000px",
    },
    envelopeFront: {
      position: "absolute",
      width: "100%",
      height: "100%",
      background: "#ff4d6d",
      borderRadius: "8px",
      transformOrigin: "top center",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      overflow: "hidden",
    },
    letterPaper: {
      position: "absolute",
      width: "100%",
      height: "100%",
      background: `
        repeating-linear-gradient(
          white,
          white 25px,
          #f5d5d5 26px,
          #f5d5d5 27px
        )
      `,
      borderRadius: "8px",
      padding: "2rem",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    },
    waxSeal: {
      position: "absolute",
      bottom: "20px",
      right: "20px",
      background: "#c54b6e",
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    },
  };

  return (
    <div style={styles.container}>
      {/* Se eliminó el bloque <style> con la importación de Dancing Script */}

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
              fontSize: "4rem",
              filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
            }}
            animate={{ rotate: isOpen ? 0 : [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            ❤️
          </motion.div>

          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "white",
              padding: "5px 10px",
              borderRadius: "4px",
              color: "#ff4d6d",
            }}
          >
            Mi bb
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              color: "white",
              fontSize: "1.5rem",
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            De mi para ti :3
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
                    color: "#c54b6e",
                    marginBottom: "1rem",
                    borderBottom: "2px solid #f5d5d5",
                    paddingBottom: "0.5rem",
                  }}
                >
                  Para la mas bella y hermosa
                </h1>

                <motion.p
                  style={{
                    lineHeight: "27px",
                    color: "#5a3d3d",
                    marginBottom: "1rem",
                    fontSize: "1.2rem",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Aunque no este contigo y este lejos quiero que sepas que te
                  quiero mucho bb
                </motion.p>

                <motion.div
                  style={styles.waxSeal}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span style={{ color: "white", fontSize: "1.5rem" }}>💌</span>
                </motion.div>

                <motion.div
                  style={{
                    marginTop: "2rem",
                    color: "#c54b6e",
                    fontSize: "1.3rem",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Feliz cumpleaños
                  <br />
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "10px",
                      fontSize: "1.5rem",
                    }}
                  >
                    A pesar de la distancia que nos separa, siento tu presencia
                    en cada latido y en cada pensamiento. Cada mensaje, se
                    convierte en el puente que acorta los kilómetros y une
                    nuestras almas. tus palabras son el refugio que me llena de
                    esperanza.Gracias por llegar a ni vida y por mantener viva
                    la llama de este amor a pesar de la separación. Cada día que
                    pasa, sueño con el momento en que la distancia deje de ser
                    un obstáculo y pueda abrazarte sin reservas.
                  </span>
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
                  💞
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ValentineCard;
