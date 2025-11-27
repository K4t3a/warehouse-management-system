# Warehouse Management System

Учебный проект: полнофункциональное веб-приложение для автоматизации складского учёта с разделением прав доступа и REST API.

---

## 1. Стек технологий

**Backend**

- Node.js, Express
- PostgreSQL + Sequelize (миграции)
- JWT аутентификация, bcrypt (хэширование паролей)
- express-validator (валидация входных данных)
- Jest (unit-тесты)

**Frontend**

- React, React Router
- Vite
- CSS 

---

## 3. Функционал 

### 3.1. Аутентификация и роли

- Вход по email/паролю, выдача JWT-токена.
- Роли: **admin**, **manager**, **storekeeper**.
- Middleware: `authenticateToken`, `authorizeRoles(...)`.

### 3.2. Управление справочниками

- Товары: CRUD, уникальный SKU, категория, единица измерения.
- Категории: древовидная структура, запрет удаления, если есть дочерние категории или товары.
- Поставщики: CRUD, запрет удаления при наличии операций.
- Склады: CRUD, запрет удаления при наличии движений/заказов.

### 3.3. Складские операции

- Приёмка товара от поставщика с ценой и сроком годности.
- Списание товара с выбором метода **FIFO/LIFO**.
- Резервирование и снятие резерва под заказы.
- Инвентаризация (корректировка остатков).
- Получение текущих остатков: физический, резерв, доступно.

### 3.4. Заказы

- Создание заказов с автозарезервированием товаров.
- Смена статусов (pending, reserved, completed, cancelled).
- Логика:
  - `reserved → completed` — снятие резерва + списание со склада.
  - `reserved → cancelled` — только снятие резерва.
- История статусов в отдельной таблице.

### 3.5. API

- REST-архитектура.
- Пагинация, фильтрация, сортировка на списках.
- Единый формат ответов:
  - успех: `{ success: true, data, message? }`;
  - ошибка: `{ success: false, message, errors? }`.

---

## 4. Структура проекта

```text
warehouse-management-system/
  backend/
    src/
      controllers/
      middleware/
      models/
      routes/
      services/
      ...
    migrations/
    tests/
    server.js
    .env.example
  frontend/
    src/
      views/        # Страницы (Login, Dashboard, Products, Warehouse, Orders)
      components/   # Layout, ProtectedRoute
      api/          # apiClient
      context/      # AuthContext
      styles.css
    vite.config.js
