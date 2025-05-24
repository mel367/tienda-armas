import React from 'react';
import './SobreNosotros.css';
import ImagenTactica from '../assets/Sobre-Nosotros.jpg';

const SobreNosotros = () => {
  return (
    <div className="sobre-nosotros-container">
      <div className="contenido">
        <img 
          src={ImagenTactica} 
          alt="Equipo táctico profesional" 
          className="imagen-tactica" 
        />
        
        <div className="texto">
        <h1 className="typewriter delay-1">¿Quiénes somos?</h1>
          
          <p>
            En <strong>Plum Plum Store</strong> no empezamos como traficantes... pero tampoco empezamos vendiendo estampitas.
          </p>
          
          <p>
            Todo comenzó cuando en una partida de <em>"Escape from Tarkov"</em>, alguien nos preguntó si podíamos conseguir un SR-25 de verdad. Nos reímos. Luego nos depositó. El resto es historia (y quizá un poco de jurisprudencia internacional ambigua).
          </p>
          
          <p>
            Desde entonces, hemos estado en la búsqueda de las mejores armas y accesorios del mundo. Nos gusta pensar que somos como los "mercenarios" de la vida real, pero con menos ética y más memes.
          </p>

          <h2>Operamos legalmente... más o menos</h2>
          <p>
            Técnicamente no vendemos armas: solo facilitamos el reencuentro entre la oferta y la demanda en territorios no regulados del internet. Y si la Interpol pregunta, esto es un sitio de fans de airsoft con buen gusto.
          </p>

          <h2>Misión</h2>
          <p>
            Dotar a gente común con equipamiento táctico de alto nivel, ya sea para su colección, defensa (o solo aparentar).
          </p>

          <p className="firma">
            — El equipo de <strong>Pium Pium Store</strong> 🇲🇽
          </p>
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros;