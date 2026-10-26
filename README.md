# Práctica 16
**¿Por qué se usa un contexto y no props para la sesión?**
Porque la sesión la usan varios componentes como el encabezado, las págs de entrar y registro.
Si se usaran props se tendrían que ir pasando de componenete en componente, con el contexto cualquier componente que esté dentro del proveedor puede leer la sesión con useSesion().

**¿Qué pasa si un componente usa la sesión fuera del proveedor?**
El contexto regresa null porque no hay un proveedor que le de valor. 

**¿Dónde se guarda el token y qué riesgo tiene ese lugar?**
En localStorage del navegador para que la sesión siga al recargar la página. El riesgo que tiene es que cualquier script que corra en la página puede leerlo, entonces se podrían robar el token y usarlo para peticiones como si fueran el usuario real, aparte el token no está cifrado aún entonces pueden ver lo que tiene dentro.