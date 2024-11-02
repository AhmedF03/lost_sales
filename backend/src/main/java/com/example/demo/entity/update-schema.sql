CREATE TABLE item
(
    id            BIGINT AUTO_INCREMENT NOT NULL,
    `description` VARCHAR(255) NULL,
    completed     BIT(1) NOT NULL,
    CONSTRAINT pk_item PRIMARY KEY (id)
);
ALTER TABLE item
    ADD count BIGINT NULL;
ALTER TABLE item
    DROP COLUMN completed;