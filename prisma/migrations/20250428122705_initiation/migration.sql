-- CreateTable
CREATE TABLE "user_status" (
    "code" CHAR(3) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name_id" VARCHAR(150) NOT NULL,
    "name_en" VARCHAR(150) NOT NULL,

    CONSTRAINT "user_status_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "application" (
    "code" CHAR(3) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name_id" VARCHAR(150) NOT NULL,
    "name_en" VARCHAR(150) NOT NULL,

    CONSTRAINT "application_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "user_module" (
    "code" VARCHAR(5) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name_id" VARCHAR NOT NULL,
    "name_en" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "user_module_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "user_submodule" (
    "code" VARCHAR(5) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_module_code" VARCHAR(5) NOT NULL,
    "name_id" VARCHAR NOT NULL,
    "name_en" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "user_submodule_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_status_name_id_key" ON "user_status"("name_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_status_name_en_key" ON "user_status"("name_en");

-- CreateIndex
CREATE UNIQUE INDEX "application_name_id_key" ON "application"("name_id");

-- CreateIndex
CREATE UNIQUE INDEX "application_name_en_key" ON "application"("name_en");

-- AddForeignKey
ALTER TABLE "user_submodule" ADD CONSTRAINT "user_submodule_user_module_code_fkey" FOREIGN KEY ("user_module_code") REFERENCES "user_module"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
