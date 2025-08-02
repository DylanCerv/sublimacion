# Firebase Setup Guide

Esta guía te ayudará a configurar Firebase para tu proyecto de sublimación.

## 🚀 Pasos de Configuración

### 1. Crear Proyecto Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto"
3. Sigue el asistente de configuración
4. Habilita Firestore Database

### 2. Configurar Firestore

1. En el panel de Firebase, ve a "Firestore Database"
2. Haz clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de prueba" (puedes cambiar las reglas después)
4. Elige una ubicación cercana a tus usuarios

### 3. Obtener Credenciales

1. Ve a "Configuración del proyecto" (ícono de engranaje)
2. Selecciona la pestaña "General"
3. En "Tus aplicaciones", haz clic en "Agregar aplicación" > "Web"
4. Registra tu aplicación con un nombre
5. Copia la configuración que aparece

### 4. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=tu_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=tu_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

**⚠️ IMPORTANTE:** Nunca commitees el archivo `.env.local` al repositorio.

### 5. Estructura de Datos en Firestore

El proyecto espera las siguientes colecciones:

#### Colección: `shirts`
```json
{
  "id": "string",
  "name": "string",
  "collection": "string", 
  "originalPrice": "number",
  "discountPercentage": "number",
  "images": ["string"],
  "description": "string",
  "sizes": ["string"],
  "colors": ["string"] (opcional),
  "tags": ["string"],
  "coutes": "number",
  "porcentajeWithCoutes": "number", 
  "freeShippingThreshold": "number",
  "featured": "boolean",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

#### Colección: `collections`
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "image": "string",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## 📁 Migrar Datos Existentes y Configurar Admin

Para migrar tus datos actuales a Firebase y configurar el usuario admin:

```bash
npm run migrate-data
```

Este comando:
- ✅ Verificará si ya existen datos
- ✅ Subirá las camisetas y colecciones
- ✅ Creará el usuario admin por defecto
- ✅ Mostrará el progreso en tiempo real

### 👤 Panel de Administración

Una vez completada la migración, puedes acceder al panel admin en:

**URL:** `http://localhost:5173/admin/login`

**Credenciales por defecto:**
- Usuario: `admin`
- Contraseña: `admin123`

**Funcionalidades del panel:**
- ✅ Dashboard con estadísticas
- ✅ Gestión completa de productos
- ✅ Gestión de colecciones
- ✅ Formularios intuitivos para crear/editar
- ✅ Búsqueda y filtros
- ✅ Estados de carga y error
- ✅ Validación de datos

## 🔧 Comandos Disponibles

- `npm run dev` - Iniciar servidor de desarrollo
- `npm run migrate-data` - Migrar datos + configurar admin
- `npm run setup-admin` - Solo configurar usuario admin
- `npm run build` - Construir para producción
- `npm run lint` - Verificar código

## 🔐 Seguridad del Panel Admin

### Producción - Configuración Recomendada:

1. **Cambiar credenciales por defecto**
2. **Usar Firebase Authentication** (recomendado para producción)
3. **Configurar reglas de seguridad robustas**

### Acceso al Panel Admin:

- **Desarrollo:** `http://localhost:5173/admin/login`
- **Producción:** `https://tu-dominio.com/admin/login`

## 🌐 Reglas de Seguridad Recomendadas

Para producción, configura estas reglas en Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura pública de productos y colecciones
    match /{collection}/{document} {
      allow read: if true;
      allow write: if false; // Solo admins pueden escribir
    }
  }
}
```

## 🚨 Troubleshooting

### Error: "Firebase not configured"
- ✅ Verifica que el archivo `.env.local` existe
- ✅ Confirma que todas las variables están configuradas
- ✅ Reinicia el servidor de desarrollo

### Error: "Permission denied"
- ✅ Verifica las reglas de Firestore
- ✅ Asegúrate de que la lectura esté habilitada

### Error durante migración
- ✅ Verifica que tienes permisos de escritura
- ✅ Confirma que las colecciones existen en Firestore

## 📞 Soporte

Si tienes problemas con la configuración:
1. Revisa la documentación oficial de Firebase
2. Verifica que todas las dependencias estén instaladas
3. Confirma que tu proyecto Firebase está activo

---

¡Tu aplicación ahora está lista para usar Firebase! 🎉