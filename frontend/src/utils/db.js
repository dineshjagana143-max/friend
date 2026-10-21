// IndexedDB utility for BestieVerse private local storage
const DB_NAME = 'BestieVerseDB';
const DB_VERSION = 1;

let dbPromise = null;

export function initDB() {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Diary Entries store
        if (!db.objectStoreNames.contains('diaryEntries')) {
          const diaryStore = db.createObjectStore('diaryEntries', { keyPath: 'id' });
          diaryStore.createIndex('date', 'date', { unique: false });
          diaryStore.createIndex('updatedAt', 'updatedAt', { unique: false });
        }

        // Drafts store
        if (!db.objectStoreNames.contains('drafts')) {
          db.createObjectStore('drafts', { keyPath: 'key' });
        }

        // Memories store
        if (!db.objectStoreNames.contains('memories')) {
          const memoryStore = db.createObjectStore('memories', { keyPath: 'id' });
          memoryStore.createIndex('date', 'date', { unique: false });
          memoryStore.createIndex('category', 'category', { unique: false });
        }
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        console.error('IndexedDB open error:', event.target.error);
        reject(event.target.error);
      };
    });
  }
  return dbPromise;
}

// Generic transaction helper
async function performTx(storeName, mode, callback) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);
    let result;

    tx.oncomplete = () => resolve(result);
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(new Error('Transaction aborted'));

    try {
      result = callback(store);
    } catch (err) {
      reject(err);
    }
  });
}

// DIARY CRUD
export async function getAllDiaryEntries() {
  return performTx('diaryEntries', 'readonly', (store) => {
    return new Promise((resolve, reject) => {
      const req = store.getAll();
      req.onsuccess = () => {
        const entries = req.result || [];
        entries.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
        resolve(entries);
      };
      req.onerror = () => reject(req.error);
    });
  });
}

export async function getDiaryEntryById(id) {
  return performTx('diaryEntries', 'readonly', (store) => {
    return new Promise((resolve, reject) => {
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  });
}

export async function saveDiaryEntry(entry) {
  const completeEntry = {
    ...entry,
    id: entry.id || 'entry_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
    updatedAt: new Date().toISOString(),
    createdAt: entry.createdAt || new Date().toISOString()
  };

  await performTx('diaryEntries', 'readwrite', (store) => {
    store.put(completeEntry);
  });
  return completeEntry;
}

export async function deleteDiaryEntry(id) {
  return performTx('diaryEntries', 'readwrite', (store) => {
    store.delete(id);
  });
}

// DRAFTS
export async function saveDraft(key, data) {
  return performTx('drafts', 'readwrite', (store) => {
    store.put({ key, data, updatedAt: new Date().toISOString() });
  });
}

export async function getDraft(key) {
  return performTx('drafts', 'readonly', (store) => {
    return new Promise((resolve, reject) => {
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result ? req.result.data : null);
      req.onerror = () => reject(req.error);
    });
  });
}

export async function clearDraft(key) {
  return performTx('drafts', 'readwrite', (store) => {
    store.delete(key);
  });
}

// MEMORIES
export async function getAllMemories() {
  return performTx('memories', 'readonly', (store) => {
    return new Promise((resolve, reject) => {
      const req = store.getAll();
      req.onsuccess = () => {
        const list = req.result || [];
        list.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
        resolve(list);
      };
      req.onerror = () => reject(req.error);
    });
  });
}

export async function saveMemory(memory) {
  const completeMemory = {
    ...memory,
    id: memory.id || 'mem_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
    createdAt: memory.createdAt || new Date().toISOString()
  };
  await performTx('memories', 'readwrite', (store) => {
    store.put(completeMemory);
  });
  return completeMemory;
}

export async function deleteMemory(id) {
  return performTx('memories', 'readwrite', (store) => {
    store.delete(id);
  });
}

// BACKUP & RESTORE
export async function exportLocalData() {
  const diary = await getAllDiaryEntries();
  const memories = await getAllMemories();
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    diaryEntries: diary,
    memories: memories,
    settings: {
      theme: localStorage.getItem('bestiverse_theme') || 'light',
      language: localStorage.getItem('bestiverse_lang') || 'en',
      userName: localStorage.getItem('bestiverse_user_name') || 'Bestie 1',
      bestieName: localStorage.getItem('bestiverse_bestie_name') || 'Bestie 2'
    }
  };
}

export async function importLocalData(backupData) {
  if (!backupData || (!backupData.diaryEntries && !backupData.memories)) {
    throw new Error('Invalid backup data format');
  }

  if (Array.isArray(backupData.diaryEntries)) {
    for (const entry of backupData.diaryEntries) {
      await saveDiaryEntry(entry);
    }
  }

  if (Array.isArray(backupData.memories)) {
    for (const mem of backupData.memories) {
      await saveMemory(mem);
    }
  }

  if (backupData.settings) {
    if (backupData.settings.theme) localStorage.setItem('bestiverse_theme', backupData.settings.theme);
    if (backupData.settings.language) localStorage.setItem('bestiverse_lang', backupData.settings.language);
    if (backupData.settings.userName) localStorage.setItem('bestiverse_user_name', backupData.settings.userName);
    if (backupData.settings.bestieName) localStorage.setItem('bestiverse_bestie_name', backupData.settings.bestieName);
  }

  return true;
}
