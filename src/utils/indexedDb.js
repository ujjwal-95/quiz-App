import { openDB } from 'idb';

const DB_NAME = "QuizDB";
const STORE_NAME = "quizHistory";

export const initDB = async () => {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
            }
        }
    });
};

export const saveQuizResult = async (data) => {
    const db = await initDB();
    await db.add(STORE_NAME, data);
};

export const getQuizHistory = async () => {
    const db = await initDB();
    return await db.getAll(STORE_NAME);
};
