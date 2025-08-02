# 🔐 Panel de Administración - Guía Completa

Tu proyecto ahora incluye un panel de administración completo para gestionar productos y colecciones.

## 🚀 Acceso al Panel

### URL del Panel
```
http://localhost:5173/admin
```

### Credenciales por Defecto
- **Usuario:** `admin`
- **Contraseña:** `admin123`

⚠️ **IMPORTANTE:** Cambia estas credenciales en producción.

## 📋 Funcionalidades Disponibles

### 🎛️ Dashboard Principal
- **Estadísticas en tiempo real**
  - Total de camisetas
  - Número de colecciones
  - Productos destacados
  - Precio promedio
- **Acciones rápidas**
  - Agregar nueva camiseta
  - Crear nueva colección
  - Gestionar productos existentes
- **Vista previa de datos recientes**

### 👕 Gestión de Camisetas

#### ➕ Agregar Nueva Camiseta
1. Ve a "Agregar Camiseta" desde el dashboard
2. Completa el formulario:
   - **Nombre:** Título del producto
   - **Colección:** Selecciona de las existentes
   - **Precio:** Precio original (en pesos)
   - **Descuento:** Porcentaje de descuento
   - **Imágenes:** URLs de Cloudinary (una por línea)
   - **Descripción:** Detalles del producto
   - **Talles:** Selecciona múltiples opciones
   - **Colores:** Opcional, selecciona colores disponibles
   - **Tags:** Palabras clave para búsqueda
   - **Producto destacado:** Marcar si aparece en home

#### ✏️ Editar Camisetas
1. Ve a "Ver Camisetas"
2. Haz clic en "Editar" en cualquier producto
3. Modifica los campos necesarios
4. Guarda los cambios

#### 🗑️ Eliminar Camisetas
1. En la lista de camisetas
2. Haz clic en "Eliminar"
3. Confirma la acción

### 📁 Gestión de Colecciones

#### ➕ Crear Nueva Colección
1. Ve a "Nueva Colección"
2. Completa:
   - **Nombre:** Título de la colección
   - **Descripción:** Breve descripción
   - **Imagen:** URL de Cloudinary

#### ✏️ Editar Colecciones
1. Ve a "Ver Colecciones"
2. Haz clic en "Editar"
3. Modifica y guarda

## 🖼️ Manejo de Imágenes

### URLs de Cloudinary
Las imágenes se manejan como URLs de Cloudinary. Formato esperado:
```
https://res.cloudinary.com/tu-cloud/image/upload/v123456789/sample.jpg
```

### Múltiples Imágenes
Para productos con varias imágenes, ingresa una URL por línea:
```
https://cloudinary.com/imagen1.jpg
https://cloudinary.com/imagen2.jpg
https://cloudinary.com/imagen3.jpg
```

## 📊 Estados de "No Hay Datos"

El panel maneja elegantemente cuando no existen datos:

### Sin Productos
- Muestra mensaje: "No hay productos existentes"
- Botón directo: "Crear el primer producto"
- Estadísticas muestran 0

### Sin Colecciones
- Muestra mensaje: "No hay colecciones existentes"
- Botón directo: "Crear la primera colección"
- Vista previa vacía

## 🔧 Configuración y Setup

### Instalación
```bash
# Instalar dependencias (ya hecho)
npm install

# Configurar Firebase (ver FIREBASE_SETUP.md)
# Crear archivo .env.local con credenciales

# Migrar datos y crear admin
npm run migrate-data

# Ejecutar en desarrollo
npm run dev
```

### Scripts Disponibles
```bash
# Migrar datos y crear usuario admin
npm run migrate-data

# Solo crear usuario admin
npm run setup-admin

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🛡️ Seguridad

### Autenticación
- Sistema de login con sesión
- Expiración automática (24 horas)
- Logout manual disponible
- Rutas protegidas

### Rutas Protegidas
- `/admin/*` - Requiere autenticación
- Redirección automática a login
- Persistencia de sesión en localStorage

### En Producción
1. **Cambiar credenciales admin** en Firebase
2. **Configurar reglas de Firestore** apropiadas
3. **Usar HTTPS** para el admin panel
4. **Hashear contraseñas** (implementar bcrypt)

## 🚨 Troubleshooting

### No Puedo Acceder
- ✅ Verificar que Firebase esté configurado
- ✅ Confirmar que el usuario admin existe
- ✅ Probar credenciales: admin/admin123

### Error al Guardar Datos
- ✅ Verificar conexión a Firebase
- ✅ Confirmar permisos de escritura en Firestore
- ✅ Revisar console para errores específicos

### Imágenes No Cargan
- ✅ Verificar URLs de Cloudinary
- ✅ Confirmar que las URLs son públicas
- ✅ Revisar formato de URLs

### Datos No Aparecen
- ✅ Ejecutar `npm run migrate-data`
- ✅ Verificar que Firebase esté configurado
- ✅ Revisar reglas de Firestore

## 📱 Características del UI

### Diseño Responsivo
- ✅ Funciona en desktop, tablet y móvil
- ✅ Navegación intuitiva
- ✅ Formularios optimizados

### Estados de Carga
- ✅ Spinners durante operaciones
- ✅ Mensajes de confirmación
- ✅ Manejo de errores elegante

### Validación
- ✅ Campos requeridos marcados
- ✅ Validación en tiempo real
- ✅ Mensajes de error claros

## 🎯 Próximas Mejoras

### Funcionalidades Futuras
- [ ] Sistema de roles (super-admin, editor)
- [ ] Historial de cambios
- [ ] Filtros avanzados en listas
- [ ] Búsqueda en admin panel
- [ ] Subida directa de imágenes
- [ ] Analytics de productos

### Optimizaciones
- [ ] Paginación en listas grandes
- [ ] Cache de imágenes
- [ ] Compresión de datos
- [ ] Backup automático

---

## 🎉 ¡Listo para Usar!

Tu panel de administración está completamente funcional. Puedes:

1. **Acceder inmediatamente** con las credenciales por defecto
2. **Agregar productos y colecciones** desde la interfaz
3. **Ver cambios en tiempo real** en la tienda
4. **Gestionar todo el contenido** sin tocar código

¡El futuro de tu tienda de sublimación está en tus manos! 🚀