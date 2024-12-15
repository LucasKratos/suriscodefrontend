
# SurisCodeFrontend

## Descripción
Este proyecto es el frontend para gestionar órdenes de compra. Fue desarrollado utilizando **React** con **Material-UI** para los componentes de interfaz de usuario, y **Axios** para la comunicación con el backend.

El diseño incluye:
- Selectores desplegables para seleccionar vendedores.
- Listados interactivos con checkboxes para seleccionar artículos.
- Modales informativos para mostrar mensajes de éxito o error.
- Un diseño centrado y responsivo.

---

## Tecnologías Utilizadas
- **React**: Biblioteca para crear interfaces de usuario.
- **Material-UI**: Biblioteca para estilizar componentes.
- **Axios**: Cliente HTTP para interactuar con APIs REST.
- **CSS**: Personalización de estilos para el diseño.

---

## Requisitos Previos
- **Node.js**: Versión 14 o superior.
- **npm** o **yarn**: Gestor de paquetes.

---

## Instalación y Ejecución

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tuusuario/SurisCodeFrontend.git
   cd SurisCodeFrontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```

4. Accede a la aplicación en tu navegador en:
   ```
   http://localhost:3000
   ```

---

## Estructura del Proyecto

```
src/
├── api/
│   └── apiClient.js        # Configuración de Axios
├── components/
│   └── MarketplaceDashboard.js  # Componente principal
├── styles/
│   └── MarketplaceDashboard.css # Estilos personalizados
├── index.js                # Punto de entrada principal
└── App.js                  # Definición principal de rutas y componentes
```

---

## Características

### Funcionalidades Principales
1. **Selección de Vendedor:**
   - Menú desplegable con una lista de vendedores obtenida desde la API.
2. **Selección de Artículos:**
   - Checkbox para seleccionar múltiples artículos con validaciones.
3. **Gestión de Órdenes:**
   - Botón de envío que muestra un spinner mientras se procesa.
   - Modal informativo al completar la acción.
4. **Validaciones de Artículos:**
   - Los artículos deben cumplir ciertas reglas:
     - Precio mayor a 0 (o permitir excepciones como almohadas).
     - Descripciones sin caracteres especiales.
     - Filtrado por depósito específico.

---

## Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo.
- `npm test`: Ejecuta las pruebas (si las hay).
- `npm run build`: Genera una versión optimizada para producción.

---

## Notas Importantes

1. **Conexión con el Backend:**
   - Este frontend utiliza una configuración de Axios con la URL base: `http://localhost:7288`.
   - Asegúrate de que el backend esté corriendo antes de iniciar este proyecto.

2. **Estilos y Diseño:**
   - Se utiliza **Material-UI** con personalización de estilos en un archivo CSS aparte (`MarketplaceDashboard.css`).
   - Los estilos incluyen centrado del componente, bordes redondeados, y efectos visuales como sombras y gradientes.

3. **Configuración de Axios:**
   - El archivo `apiClient.js` contiene la configuración de Axios, que incluye la URL base y encabezados predeterminados.

