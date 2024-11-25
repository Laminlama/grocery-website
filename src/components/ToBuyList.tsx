import { useState } from "react";

const ToBuyList = () => {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<string>("");

  const handleAddItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem(""); // Clear input after adding
    }
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>To-Buy List</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Add an item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAddItem} style={styles.addButton}>
          Add
        </button>
      </div>
      {items.length > 0 ? (
        <ul style={styles.list}>
          {items.map((item, index) => (
            <li key={index} style={styles.listItem}>
              <span>{item}</span>
              <button
                onClick={() => handleRemoveItem(index)}
                style={styles.removeButton}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.emptyText}>Your list is empty. Start adding items!</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    backgroundColor: "#fff",
    fontFamily: "'Arial', sans-serif",
  },
  header: {
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginRight: "10px",
  },
  addButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  list: {
    listStyleType: "none",
    padding: "0",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
  removeButton: {
    padding: "5px 10px",
    fontSize: "0.9rem",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
  },
};

export default ToBuyList;
