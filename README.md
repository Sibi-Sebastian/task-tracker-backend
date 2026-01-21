SELECT NOW();

CREATE USER task_user WITH PASSWORD 'task_password';

GRANT ALL PRIVILEGES ON DATABASE task_tracker_db TO task_user;

ALTER DATABASE task_tracker_db OWNER TO task_user;

ALTER USER task_user CREATEDB; (db connections issue by prisma)

npm init -y

npm install prisma --save-dev

npm install @prisma/client

npx prisma init

This creates:

<pre class="overflow-visible! px-0!" data-start="1680" data-end="1719"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-[calc(--spacing(9)+var(--header-height))] @w-xl/main:top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>prisma/
 └── schema.prisma
.</span><span>env</span></span></code></div></div></pre>

mkdir src
mkdir src/controllers
mkdir src/routes
mkdir src/services
mkdir src/repositories
mkdir src/middleware
mkdir src/database
mkdir src/utils

touch src/database/prisma.js

// src/database/prisma.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

npm install --save-dev @types/node

prisma schema:

// ENUMS
enum UserRole {
  USER
  ADMIN
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  DONE
}

// MODELS

model User {
  id            String         @id @default(uuid())
  email         String         @unique
  password      String
  role          UserRole       @default(USER)
  tasks         Task[]
  refreshTokens RefreshToken[]
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
}

model Task {
  id          String      @id @default(uuid())
  title       String
  description String?
  status      TaskStatus @default(TODO)
  user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId      String
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model RefreshToken {
  id        String   @id @default(uuid())
  token     String   @unique
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId    String
  expiresAt DateTime
  createdAt DateTime @default(now())
}

npm install --save-dev @types/node

### Why this is the right solution

* Adds Node.js type definitions
* Fixes `process`, `__dirname`, etc.
* Required because Prisma uses TS internally

npx prisma migrate dev --name init (run prisma)


