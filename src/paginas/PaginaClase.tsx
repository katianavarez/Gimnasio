import { Link, useLocation, useNavigate, useParams } from "react-router";
import { useClase } from "../hooks/useClase";
import { Cargando } from "../componentes/Cargando";
import { MensajeError } from "../componentes/MensajeError";
import { estadoDeError, mensajeDeError, urlImagen } from "../servicios/api";
import { useSesion } from "../sesion/SesionContext";
import { useState } from "react";
import { inscribirse } from "../servicios/gimnasio";

interface Aviso {
    tipo: 'exito' | 'error',
    texto: string;
}

export default function PaginaClase() {
    const { id } = useParams();

    const { clase, cargando, error, reintentar } = useClase(Number(id));

    const navegar = useNavigate();

    const ubicacion = useLocation();

    const { usuario } = useSesion();

    const [aviso, setAviso] = useState<Aviso | null>(null);

    if (cargando) return <Cargando/>;
    if(error) return <MensajeError mensaje={error ?? "Ocurrió un error al cargar la clase"} onReintentar={reintentar}/>;

    if(!clase) return <MensajeError mensaje={error ?? "Ocurrió un error al cargar la clase"} onReintentar={reintentar}/>;
    
    async function inscribir(horarioId:number) {
        if (!usuario) {
            navegar("/entrar", {state: {desde: ubicacion.pathname}});
            return;
        }

        setAviso(null);

        try {
            await inscribirse(horarioId);
            setAviso({tipo: "exito", texto: "Te inscribiste a la clase."});
            reintentar();
        } catch(e) {
            if (estadoDeError(e) === 401) {
                navegar("/entrar", {state: {desde: ubicacion.pathname}});
            } else {
                setAviso({tipo: "error", texto: mensajeDeError(e, "No se pudo completar la inscripción.")});
            }
        }
    }

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
                {aviso && <p className={`aviso aviso--${aviso?.tipo}`}>{aviso.texto}</p>}
                <ul className="horarios">
                { clase.horarios.map((h)=>(
                        <li key={h.id} className="horario">
                            <div>
                            <div className="horario__dia">{h.dia} · {h.horaInicio}</div>
                            <div className="horario__meta">{h.entrenador}· {h.disponibles} de {h.cupoMaximo} lugares</div>
                            </div>
                            <button className="boton boton--chico" onClick={()=> inscribir(h.id)}>Inscribirme</button>
                        </li>
                ))

                }
                </ul>
            </div>
            </article>
        </>
    )
}