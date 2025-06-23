import { IdentifiableCake } from "../../model/Cake.model";
import { id, Initializable, IRepository } from "../IRepository";
import { DbException, InitializationException, ItemNotFoundException } from "../../util/exceptions/repositoryExceptions";
import logger from "../../util/logger";
import { ConnectionManager } from "./ConnectionManager";
import { ItemCategory } from "../../model/IItem";
import { ISQLiteCake, SQLiteCakeMapper } from "../../mappers/Cake.mapper";

const tableName = ItemCategory.CAKE;

const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS ${tableName} (
            id TEXT PRIMARY KEY,
            type TEXT not NULL,
            flavor TEXT not NULL,
            filling TEXT not NULL,
            size TEXT not NULL,
            layers INTEGER not NULL,
            frostingType TEXT not NULL,
            frostingFlavor TEXT not NULL,
            decorationType TEXT not NULL,
            decorationColor TEXT not NULL,
            customMessage TEXT not NULL,
            shape TEXT not NULL,
            allergies TEXT not NULL,
            specialIngredients TEXT not NULL,
            packagingType TEXT not NULL
        )`;

const INSERT_CAKE = `INSERT INTO ${tableName} (
        id, type, flavor, filling, size, layers, frostingType,
         frostingFlavor, decorationType, decorationColor,
          customMessage, shape, allergies, specialIngredients,
           packagingType) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const SELECT_BY_ID = `SELECT * FROM ${tableName} WHERE id = ?`;

const SELECT_ALL = `SELECT * FROM ${tableName}`;

const DELETE_BY_ID = `DELETE FROM ${tableName} WHERE id = ?`;

const UPDATE_BY_ID = `UPDATE ${tableName} SET
        type = ?, flavor = ?, filling = ?, size = ?, layers = ?, frostingType = ?,
        frostingFlavor = ?, decorationType = ?, decorationColor = ?,
        customMessage = ?, shape = ?, allergies = ?, specialIngredients = ?,
        packagingType = ? WHERE id = ?`;

export class CakeRepository implements IRepository<IdentifiableCake>, Initializable {

    async init(): Promise<void> {
        try {
            const conn = await ConnectionManager.getConnection();
            await conn.exec(CREATE_TABLE);
            logger.info("Table cake created successfully");
        } catch (error: unknown) {
            logger.error("Error creating table: %o", error as Error);
            throw new InitializationException("Error initializing the repository", error as Error);
        }
    }

    async create(item: IdentifiableCake): Promise<id> {
        // it is expected that a transaction is initiated before calling this method
        try {
            const conn = await ConnectionManager.getConnection();
            await conn.run(INSERT_CAKE, [
                item.getId(),
                item.getType(),
                item.getFlavor(),
                item.getFilling(),
                item.getSize(),
                item.getLayers(),
                item.getFrostingType(),
                item.getFrostingFlavor(),
                item.getDecorationType(),
                item.getDecorationColor(),
                item.getCustomMessage(),
                item.getShape(),
                item.getAllergies(),
                item.getSpecialIngredients(),
                item.getPackagingType()
            ]);
            return item.getId();
        }
        catch (error: unknown) {
            logger.error("Error creating cake: %o", error as Error);
            throw new DbException("Error creating the cake", error as Error);
        }

    }
    async get(id: id): Promise<IdentifiableCake> {
        try {
            const conn = await ConnectionManager.getConnection();
            const result = await conn.get<ISQLiteCake>(SELECT_BY_ID, id);
            logger.info("Cake with ID %s retrieved successfully. Cake : %o", id, result);
            if (!result) {
                logger.error("Cake with ID %s not found", id);
                throw new ItemNotFoundException(`Cake with ID ${id} not found`);
            }
            return new SQLiteCakeMapper().map(result);

        } catch (error) {
            logger.error("Failed to get cake of id %s: %o", id, error as Error);
            throw new DbException("Error getting the cake", error as Error);
        }
    }
    async getAll(): Promise<IdentifiableCake[]> {
        try {
            const conn = await ConnectionManager.getConnection();
            const result = await conn.all<ISQLiteCake[]>(SELECT_ALL);
            const mapper = new SQLiteCakeMapper();
            return result.map(item => mapper.map(item));
        } catch (error) {
            logger.error("Failed to get all cakes");
            throw new DbException("Error getting all cakes", error as Error);
        }
    }
    async update(item: IdentifiableCake): Promise<void> {
        try {
            const conn = await ConnectionManager.getConnection();
            await conn.run(UPDATE_BY_ID, [
                item.getType(),
                item.getFlavor(),
                item.getFilling(),
                item.getSize(),
                item.getLayers(),
                item.getFrostingType(),
                item.getFrostingFlavor(),
                item.getDecorationType(),
                item.getDecorationColor(),
                item.getCustomMessage(),
                item.getShape(),
                item.getAllergies(),
                item.getSpecialIngredients(),
                item.getPackagingType(),
                item.getId()
            ]);
        } catch (error) {
            logger.error("Failed to update cake with ID %s: %o", item.getId(), error as Error);
            throw new DbException("Error updating the cake of id " + item.getId(), error as Error);
        }
    }
    async delete(id: id): Promise<void> {
        try {
            const conn = await ConnectionManager.getConnection();
            await conn.run(DELETE_BY_ID, id);
        } catch (error) {
            logger.error("Failed to delete cake with ID %s", id);
            throw new DbException("Error deleting the cake of id " + id, error as Error);
        }
    }
}