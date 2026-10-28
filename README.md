# Práctica 16
**¿Por qué se usa un contexto y no props para la sesión?**
Porque la sesión la usan varios componentes y si se usaran props se tendrían que ir pasando de componenete en componente, en cambio con el contexto cualquier componente que esté dentro del proveedor puede leer la sesión con useSesion().

**¿Qué pasa si un componente usa la sesión fuera del proveedor?**
El contexto regresa null porque no hay un proveedor que le de valor. 

**¿Dónde se guarda el token y qué riesgo tiene ese lugar?**
En localStorage del navegador. El riesgo que tiene es que cualquier script que corra en la página puede leerlo entonces se podrían robar el token y usarlo para peticiones como si fueran el usuario real.

# Práctica 17
**¿La ruta protegida hace segura la aplicación? ¿Qué es lo que de verdad protege los datos?**
No, solo esconde la página cuando no hay sesión, pero alguien podría hacer la petición directo a la API con curl y se la salta. Lo que de verdad protege los datos es el backend porque revisa el token en cada petición y si no es válido responde un 401.

**Comprobación con curl**
Captura en evidencias.
curl -i http://localhost:3000/inscripciones/mias
HTTP/1.1 401 Unauthorized
{"message":"Unauthorized","statusCode":401}

**¿Por qué no se manda el miembroId al inscribirse?**
Porque el backend saca quién es el miembro del token que va en el header Authorization. Si el frontend mandara el miembroId, cualquiera podría cambiarlo y meter a otra persona a una clase.

**¿Qué diferencia hay entre un 401 y un 403?**
El 401 es cuando la API no sabe quién eres, porque no mandaste token o el token es falso o ya venció y el 403 es cuando sí sabe quién eres pero no tienes permiso para hacer eso.