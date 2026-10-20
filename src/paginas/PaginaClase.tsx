import { Link, useParams } from "react-router";
import { useClase } from "../hooks/useClase";
import { Cargando } from "../componentes/Cargando";
import { MensajeError } from "../componentes/MensajeError";
import { urlImagen } from "../servicios/api";

export default function PaginaClase() {
    const { id } = useParams();

    const { clase, cargando, error, reintentar } = useClase(Number(id));

    if (cargando) return <Cargando/>;
    if(error) return <MensajeError mensaje={error ?? "Ocurrió un error al cargar la clase"} onReintentar={reintentar}/>;

    if(!clase) return <MensajeError mensaje={error ?? "Ocurrió un error al cargar la clase"} onReintentar={reintentar}/>;
    return (
        <>
            <Link to="/clases" className="detalle__volver">← Todas las clases</Link>

            <article className="detalle">
            <img className="detalle__imagen" src={urlImagen(clase.imagen)} alt={clase.nombre} />
            <div className="detalle__datos">
                <span className="etiqueta etiqueta--fuerza">{clase.categoria}</span>
                <h1>{clase.nombre}</h1>
                <p className="pagina__bajada">{clase.descripcion} · {clase.duracionMin} min</p>

                <h2>Horarios</h2>
                <ul className="horarios">
                { clase.horarios.map((h)=>(
                        <li className="horario">
                            <div>
                            <div className="horario__dia">{h.dia} · {h.horaInicio}</div>
                            <div className="horario__meta">{h.entrenador}· {h.disponibles} de {h.cupoMaximo} lugares</div>
                            </div>
                            <button className="boton boton--chico">Inscribirme</button>
                        </li>
                ))

                }
                </ul>
            </div>
            </article>
        </>
    )
}