export type id = string
export interface ID {
    getId(): string;
}

/**
 * Init - Intializes the creation of required tables and establishes a connection to the data source.
 *
 * @throws {InitializationException} If the initialization process fails.
 *
 * @returns A promise that resolves when the initialization is complete.
 */
export interface Initializable {
    init(): Promise<void>;
}

/**
 * Generic repository interface for managing entities that extend the `ID` interface.
 *
 * @typeParam T - The entity type, which must extend `ID`.
 *
 * @remarks
 * This interface defines the standard CRUD operations for a repository pattern.
 * Implementations may throw an `InvalidItemException` if an invalid item is provided,
 * or other exceptions if an item is not found.
 */
export interface IRepository<T extends ID> {
    /**
     * Creates a new item in the repository.
     *
     * @param item - The item to be created.
     * @returns A promise that resolves to the ID of the newly created item.
     *
     * @throws {InvalidItemException} - Thrown when an invalid item is encountered.
     * @throws {DbException}  - Thrown when there is an error during interacting with the database.
     */
    create(item: T): Promise<id>;

    /**
     * Retrieves an item by its ID.
     *
     * @param id - The ID of the item to retrieve.
     * @returns A promise that resolves to the found item.
     *
     * @throws {ItemNotFoundException} If no item with the given ID exists.
     * @throws {DbException}  - Thrown when there is an error during interacting with the database.
     */
    get(id: id): Promise<T>;

    /**
     * Retrieves all items in the repository.
     *
     * @returns A promise that resolves to an array of all items.
     * @throws {DbException}  - Thrown when there is an error during interacting with the database.
     */
    getAll(): Promise<T[]>;

    /**
     * Updates an existing item in the repository.
     *
     * @param item - The item to update.
     * @returns A promise that resolves when the update is complete.
     *
     * @throws {ItemNotFoundException} If the item does not exist.
     * @throws {InvalidItemException} If the provided item is invalid.
     * @throws {DbException}  - Thrown when there is an error during interacting with the database.
     */
    update(item: T): Promise<void>;

    /**
     * Deletes an item by its ID.
     *
     * @param id - The ID of the item to delete.
     * @returns A promise that resolves when the deletion is complete.
     *
     * @throws {ItemNotFoundException} If no item with the given ID exists.
     * @throws {DbException}  - Thrown when there is an error during interacting with the database.
     */
    delete(id: id): Promise<void>;
}

export interface InitializableRepository<T extends ID> extends IRepository<T> , Initializable{

}