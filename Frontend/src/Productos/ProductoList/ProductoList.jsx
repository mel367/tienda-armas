import React, { useEffect, useState } from "react";
import ProductoCard from "../ProductoCard/ProductoCard";
import "../ProductoList/css/ProductoList.css";
import { API_VERSION, GET_PRODUCTS } from "../../utils/Url/urlUtils";

const productos = [
  {
    id: 1,
    nombre: "AK-47",
    descripcion:
      "El legendario fusil de asalto soviético, conocido por su durabilidad extrema y funcionamiento en condiciones adversas. Su diseño simple y eficaz lo ha convertido en el arma más distribuida del mundo, protagonista de conflictos desde la Guerra Fría hasta la actualidad.",
    precio: 1500, // Aumentado por su estatus de icono
    imagen: "/ak-47.webp",
    calibre: "7.62×39mm",
    SistemaDeDisparo: "semi-automático y automático",
    longitud: "880 mm",
    peso: "4.3 kg",
    capacidad: "Cargador de 30, 40 a 50 rondas",
  },
  {
    id: 2,
    nombre: "M249 SAW",
    descripcion:
      "Ametralladora ligera belga-estadounidense, estándar en las fuerzas de la OTAN. Su alimentación por cinta o cargador STANAG ofrece versatilidad en combate prolongado. Ideal para supresión de fuego y apoyo a pelotones en operaciones extendidas.",
    precio: 3800, // Aumentado por su capacidad
    imagen: "/m249.jpeg",
    calibre: "5.56×45mm OTAN",
    SistemaDeDisparo: "automático",
    longitud: "1000 mm",
    peso: "7.5 kg",
    capacidad: "Cintas de 100-200 rondas o cargadores STANAG",
  },
  {
    id: 3,
    nombre: "M240",
    descripcion:
      "Ametralladora media de fabricación belga (FN Herstal) adoptada por EE.UU. como arma de propósito general. Su robustez y precisión en calibre 7.62mm la hacen efectiva contra objetivos a media/larga distancia y vehículos ligeros.",
    precio: 4500, // Precio consistente con su categoría
    imagen: "/m240.jpeg",
    calibre: "7.62×51mm",
    SistemaDeDisparo: "automático",
    longitud: "1211 mm",
    peso: "11.8 kg",
    capacidad: "Cintas de 50-100 rondas",
  },
  {
    id: 4,
    nombre: "PKM",
    descripcion:
      "Ametralladora de propósito general soviética, famosa por su simplicidad y efectividad. Utiliza el potente cartucho 7.62×54mmR, con mecanismo de alimentación por cinta que garantiza fuego sostenido en combates intensos.",
    precio: 3500, // Aumentado por su reputación
    imagen: "/pkm.jpeg",
    calibre: "7.62×54mmR",
    SistemaDeDisparo: "automático",
    longitud: "1173 mm",
    peso: "8.4 kg",
    capacidad: "Cintas de 100-200 rondas",
  },
  {
    id: 5,
    nombre: "Noveske N4",
    descripcion:
      "Fusil AR-15 de ultra alta gama fabricado en EE.UU., preferido por unidades especiales. Combina precisión de sniper con la fiabilidad de un arma de combate. Incluye rieles M-LOK para accesorios y cañón de acero cromado.",
    precio: 3200, // Aumentado por ser premium
    imagen: "/Noveske.jpeg",
    calibre: "5.56x45mm OTAN",
    SistemaDeDisparo: "semi-automático y automático",
    longitud: "11.5 pulgadas (cañón)",
    peso: "3.5 kg",
    capacidad: "Cargadores PMAG de 30-60 rondas",
  },
  {
    id: 6,
    nombre: "Snipex Alligator",
    descripcion:
      "Rifle antimaterial ucraniano de calibre 14.5mm, diseñado para neutralizar vehículos blindados ligeros y equipos a distancias extremas (hasta 2km). Su sistema de retroceso hidráulico reduce la fuerza sobre el tirador, permitiendo disparos precisos consecutivos.",
    precio: 8500, // Aumentado por ser antimaterial
    imagen: "/alligator2.png",
    calibre: "14.5×114mm",
    SistemaDeDisparo: "cerrojo de acción manual",
    longitud: "2000 mm",
    peso: "25 kg",
    capacidad: "Cargador de 5 rondas",
  },
  {
    id: 7,
    nombre: "M110 SASS",
    descripcion:
      "Sistema de fusil de precisión semi-automático adoptado por el ejército estadounidense. Diseñado para tiradores designados que requieren fuego rápido y preciso a distancias medias. Compatible con silenciadores y ópticas avanzadas.",
    precio: 4800, // Ajuste menor
    imagen: "/m110.jpeg",
    calibre: "7.62×51mm NATO / 6.5mm Creedmoor",
    SistemaDeDisparo: "semi-automático",
    longitud: "1,029 mm",
    peso: "4.7 kg",
    capacidad: "Cargadores SR-25 de 10-20 rondas",
  },
  {
    id: 8,
    nombre: "CheyTac Intervention M200",
    descripcion:
      "El rifle de francotirador de mayor alcance efectivo en el mundo (2,500m+). Utiliza el exclusivo cartucho .408 CheyTac, diseñado para mantener energía supersónica a distancias extremas. Sistema de cerrojo accionado manualmente con precisión sub-MOA.",
    precio: 9800, // Aumentado significativamente por ser élite
    imagen: "/m2000.jpeg",
    calibre: ".408 CheyTac / 10×27mm",
    SistemaDeDisparo: "cerrojo de acción manual",
    longitud: "1,346 mm",
    peso: "14 kg",
    capacidad: "Cargador de 7 rondas",
  },
  {
    id: 9,
    nombre: "MK18 Mod 1",
    descripcion:
      "Versión CQB del M4 utilizada por SEALs y fuerzas especiales. Cañón corto de 10.3 pulgadas optimizado para combate urbano y operaciones encubiertas. Compatible con supresores y sistemas de visión nocturna.",
    precio: 3100, // Aumentado por ser militar
    imagen: "/mk18.webp",
    calibre: "5.56×45mm NATO",
    SistemaDeDisparo: "semi-automático y automático",
    longitud: "752 mm (con culata extendida)",
    peso: "2.72 kg",
    capacidad: "Cargadores STANAG de 30-60 rondas",
  },
  {
    id: 10,
    nombre: "SIG Sauer MCX Virtus",
    descripcion:
      "Sistema de fusil modular de última generación, con mecanismo de pistón de corto recorrido que reduce mantenimiento. Versiones disponibles en 5.56mm y .300 BLK (óptimo para silenciadores). Empleado por unidades de élite mundiales.",
    precio: 3400, // Aumentado por tecnología
    imagen: "/mcx.jpg",
    calibre: "5.56×45mm NATO / .300 AAC Blackout",
    SistemaDeDisparo: "semi-automático y automático",
    longitud: "908 mm (con culata extendida)",
    peso: "2.72 kg",
    capacidad: "Cargadores de 30 rondas",
  },
  {
    id: 11,
    nombre: "KRISS Vector Gen II",
    descripcion:
      "Subfusil de diseño futurista que utiliza un sistema de retroceso vectorial único, reduciendo hasta un 60% el levantamiento del cañón en ráfaga. Disponible en múltiples calibres, es ideal para protección personal y operaciones tácticas en espacios cerrados.",
    precio: 2800, // Reducido por ser subfusil
    imagen: "/vector.jpeg",
    calibre: ".45 ACP / 9mm / .40 S&W",
    SistemaDeDisparo: "semi-automático, automático y ráfaga 2-disparos",
    longitud: "406-773 mm (ajustable)",
    peso: "2.5 kg",
    capacidad: "Cargadores de 30-50 rondas",
  },
  {
    id: 12,
    nombre: "HK G3A3",
    descripcion:
      "Fusil de batalla alemán de calibre 7.62mm, famoso por su construcción resistente y precisión a larga distancia. Aunque pesado, su sistema de cerrojo por rodillos lo hace extremadamente fiable en condiciones adversas. Icono de la Guerra Fría.",
    precio: 2200, // Aumentado por su historia
    imagen: "/g3.jpeg",
    calibre: "7.62×51mm NATO",
    SistemaDeDisparo: "semi-automático y automático",
    longitud: "1025 mm",
    peso: "4.7 kg",
    capacidad: "Cargadores de 20-50 rondas",
  },
  {
    id: 13,
    nombre: "HK G36KV",
    descripcion:
      "Fusil de asalto alemán de última generación con estructura polimérica que reduce peso sin sacrificar resistencia. Sistema óptico integrado de punto rojo y aumento 3x. Empleado por más de 40 países como arma estándar.",
    precio: 2900, // Aumentado por tecnología
    imagen: "/g36.jpeg",
    calibre: "5.56×45mm NATO",
    SistemaDeDisparo: "semi-automático, automático y ráfaga 2-disparos",
    longitud: "758 mm (culata plegada)",
    peso: "3 kg",
    capacidad: "Cargadores transparentes de 30 rondas",
  },
  {
    id: 14,
    nombre: "HK USP Tactical .45",
    descripcion:
      "Pistola táctica alemana diseñada para fuerzas especiales, con riel para accesorios y rosca para supresor. Sistema de amortiguación de retroceso único y gatillo ajustable. La elección de operadores que requieren potencia de parada en paquete compacto.",
    precio: 950, // Aumentado por versión táctica
    imagen: "/usp.jpeg",
    calibre: ".45 ACP",
    SistemaDeDisparo: "semi-automático",
    longitud: "200 mm",
    peso: "789 g",
    capacidad: "Cargadores de 12 rondas",
  },
  {
    id: 15,
    nombre: "Taurus Raging Hunter .500",
    descripcion:
      "Revolver de caza mayor con el calibre de producción más potente del mundo (.500 S&W Magnum). Estructura de acero inoxidable con compensador de muzzel brake integrado para controlar el brutal retroceso. Ideal para caza de animales peligrosos.",
    precio: 1500, // Reducido por ser revólver
    imagen: "/revolver.jpg",
    calibre: ".500 S&W Magnum",
    SistemaDeDisparo: "acción simple/doble",
    longitud: "419 mm (cañón 8.375 pulgadas)",
    peso: "1.5 kg",
    capacidad: "Tambor de 5 rondas",
  },
  {
    id: 16,
    nombre: "Barrett M82A1",
    descripcion:
      "El rifle antimaterial semi-automático más reconocido globalmente. Capaz de penetrar blindajes ligeros y materiales de construcción a más de 1,800m. Su sistema de retroceso de cañón corto reduce significativamente la energía transmitida al tirador.",
    precio: 8900, // Aumentado por ser icónico
    imagen: "/m82.jpeg",
    calibre: "12.7×99mm (.50 BMG)",
    SistemaDeDisparo: "semi-automático",
    longitud: "1500 mm",
    peso: "13.5 kg",
    capacidad: "Cargador de 10 rondas",
  },
  {
    id: 17,
    nombre: "FX-05 Xiuhcoatl",
    descripcion:
      "Primer fusil de asalto 100% mexicano, desarrollado por la SEDENA. Utiliza polímeros aeronáuticos que lo hacen resistente y ligero. Sistema operado por gas con selector ambidiestro. Orgullo de las fuerzas armadas mexicanas.",
    precio: 1800, // Aumentado por valor nacional
    imagen: "/fx.jpg",
    calibre: "5.56×45mm NATO",
    SistemaDeDisparo: "semi-automático y automático",
    longitud: "940 mm",
    peso: "4.05 kg",
    capacidad: "Cargadores de 30 rondas",
  },
  {
    id: 18,
    nombre: "SIG Sauer M17",
    descripcion:
      "Pistola modular de combate adoptada por el ejército estadounidense en 2017. Incluye miras luminiscentes, riel M1913 y capacidad de montar ópticas. Sistema de seguridad mejorado y cargadores de alta capacidad.",
    precio: 850, // Precio consistente
    imagen: "/m17.jpeg",
    calibre: "9×19mm Parabellum",
    SistemaDeDisparo: "semi-automático",
    longitud: "203 mm",
    peso: "834 g",
    capacidad: "Cargadores de 17-21 rondas",
  },
  {
    id: 19,
    nombre: "Glock 19 Gen5 MOS",
    descripcion:
      "La evolución del estándar oro en pistolas de servicio. Versión Modular Optic System permite instalar miras réflex sin modificaciones. Superficie nanotexturizada para mejor agarre y cañón marksman para mayor precisión.",
    precio: 800, // Precio consistente
    imagen: "/glock.jpeg",
    calibre: "9×19mm Parabellum",
    SistemaDeDisparo: "semi-automático",
    longitud: "185 mm",
    peso: "680 g",
    capacidad: "Cargadores de 15-21 rondas",
  },
  {
    id: 20,
    nombre: "FN Five-seveN MK3",
    descripcion:
      "Pistola táctica diseñada para complementar el sistema P90. Utiliza el cartucho 5.7×28mm capaz de penetrar chalecos antibalas nivel IIIA. Perfil delgado ideal para porte oculto, con cargadores de gran capacidad y bajo retroceso.",
    precio: 1400, // Aumentado por munición especial
    imagen: "/fn.jpg",
    calibre: "5.7×28mm",
    SistemaDeDisparo: "semi-automático",
    longitud: "208 mm",
    peso: "744 g",
    capacidad: "Cargadores de 20 rondas",
  },
  {
    id: 21,
    nombre: "MP40 (Maschinenpistole 40)",
    descripcion:
      "Subfusil alemán icónico de la Segunda Guerra Mundial, reconocible por su culata plegable y cargador recto. Aunque antiguo, sigue siendo apreciado por coleccionistas y recreadores históricos por su diseño robusto y fácil manejo.",
    precio: 2500, // Aumentado por valor histórico/colección
    imagen: "/mp40.jpeg",
    calibre: "9×19mm Parabellum",
    SistemaDeDisparo: "automático",
    longitud: "880 mm (con culata extendida)",
    peso: "4.7 kg",
    capacidad: "Cargadores de 32 rondas",
  },
];

function ProductoList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const FechData = async () => {
      try {
        const UrlData = await fetch(`${GET_PRODUCTS}`);
        const data = await UrlData.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    FechData();
  }, []);

  return (
    <section className="producto-list-container">
      <h2 className="catalogo-titulo">Catálogo de Productos</h2>
      <div className="producto-grid">
        {data.map((producto) => (
          <ProductoCard key={producto._id} producto={producto} />
        ))}
      </div>
    </section>
  );
}

export default ProductoList;
