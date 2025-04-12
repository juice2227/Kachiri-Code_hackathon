import React, { useState, useEffect, useRef } from "react";
import { GiNotebook } from "react-icons/gi";
import {
  FaTrash,
  FaEdit,
  FaPlus,
  FaSave,
  FaTimes,
  FaFolderOpen,
} from "react-icons/fa";

function Journal() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("journal-notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [currentNote, setCurrentNote] = useState({
    id: null,
    title: "",
    content: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const fileInputRef = useRef(null);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("journal-notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNew = () => {
    const newNote = {
      id: Date.now(),
      title: `Note ${notes.length + 1}`,
      content: "",
      date: new Date().toLocaleString(),
    };
    setNotes([...notes, newNote]);
    setCurrentNote(newNote);
    setIsEditing(true);
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (currentNote.id) {
      setNotes(
        notes.map((note) =>
          note.id === currentNote.id
            ? {
                ...currentNote,
                date: new Date().toLocaleString(),
              }
            : note
        )
      );
    }
    setIsEditing(false);
    setIsRenaming(false);
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (currentNote.id === id) {
      setCurrentNote({ id: null, title: "", content: "" });
      setIsEditing(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentNote((prev) => ({ ...prev, [name]: value }));
  };

  const startRenaming = (note) => {
    setNewTitle(note.title);
    setIsRenaming(note.id);
  };

  const handleRename = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, title: newTitle } : note
      )
    );
    if (currentNote.id === id) {
      setCurrentNote((prev) => ({ ...prev, title: newTitle }));
    }
    setIsRenaming(false);
  };

  const openNote = (note) => {
    setCurrentNote(note);
    setIsEditing(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const fileContent = event.target.result;
        const parsedContent = JSON.parse(fileContent);

        if (Array.isArray(parsedContent)) {
          // It's an array of notes
          setNotes(parsedContent);
          if (parsedContent.length > 0) {
            setCurrentNote(parsedContent[0]);
          }
        } else if (typeof parsedContent === "object" && parsedContent.content) {
          // It's a single note
          const newNote = {
            id: Date.now(),
            title: parsedContent.title || `Imported Note ${notes.length + 1}`,
            content: parsedContent.content,
            date: new Date().toLocaleString(),
          };
          setNotes([...notes, newNote]);
          setCurrentNote(newNote);
        }
      } catch (error) {
        // Handle text file import
        const newNote = {
          id: Date.now(),
          title:
            file.name.replace(/\.[^/.]+$/, "") ||
            `Imported Note ${notes.length + 1}`,
          content: event.target.result,
          date: new Date().toLocaleString(),
        };
        setNotes([...notes, newNote]);
        setCurrentNote(newNote);
      }
    };

    if (file.name.endsWith(".json")) {
      reader.readAsText(file);
    } else {
      reader.readAsText(file);
    }
  };

  const exportNotes = () => {
    const dataStr = JSON.stringify(notes, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = "journal-notes.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-800 mb-6 flex items-center">
          <GiNotebook className="mr-2" /> My Journal
        </h1>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={handleAddNew}
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition flex items-center"
          >
            <FaPlus className="mr-2" /> New Note
          </button>
          <button
            onClick={() => fileInputRef.current.click()}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition flex items-center"
          >
            <FaFolderOpen className="mr-2" /> Open File
          </button>
          <button
            onClick={exportNotes}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center"
          >
            <FaSave className="mr-2" /> Export All
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json,.txt,.md"
            className="hidden"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Notes List */}
          <div className="md:col-span-1 bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-purple-700">
                Your Notes
              </h2>
              <span className="text-sm text-gray-500">
                {notes.length} {notes.length === 1 ? "note" : "notes"}
              </span>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              {notes.length === 0 ? (
                <p className="text-gray-500">
                  No notes yet. Create or import some!
                </p>
              ) : (
                notes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-3 rounded-lg cursor-pointer transition ${
                      currentNote.id === note.id
                        ? "bg-purple-100 border-l-4 border-purple-500"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    {isRenaming === note.id ? (
                      <div className="flex items-center mb-2">
                        <input
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="flex-grow p-1 border border-gray-300 rounded"
                          autoFocus
                        />
                        <button
                          onClick={() => handleRename(note.id)}
                          className="ml-2 text-green-500"
                        >
                          <FaSave size={14} />
                        </button>
                        <button
                          onClick={() => setIsRenaming(false)}
                          className="ml-1 text-red-500"
                        >
                          <FaTimes size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <h3
                          className="font-medium text-purple-800 truncate"
                          onClick={() => openNote(note)}
                        >
                          {note.title}
                        </h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startRenaming(note);
                            }}
                            className="text-gray-500 hover:text-blue-500"
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(note.id);
                            }}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">{note.date}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Note Editor/Viewer */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
            {isEditing ? (
              <div className="h-full flex flex-col">
                <input
                  type="text"
                  name="title"
                  value={currentNote.title}
                  onChange={handleChange}
                  placeholder="Note title"
                  className="text-xl font-semibold mb-4 p-2 border-b border-gray-300 focus:border-purple-500 focus:outline-none"
                />
                <textarea
                  name="content"
                  value={currentNote.content}
                  onChange={handleChange}
                  placeholder="Write your thoughts here..."
                  className="flex-grow p-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
                  rows={15}
                />
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">
                    Last edited: {new Date().toLocaleString()}
                  </span>
                  <button
                    onClick={handleSave}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center"
                  >
                    <FaSave className="mr-2" /> Save
                  </button>
                </div>
              </div>
            ) : currentNote.id ? (
              <div className="h-full">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-purple-800">
                    {currentNote.title}
                  </h2>
                  <button
                    onClick={() => handleEdit(currentNote)}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    <FaEdit size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                  Created: {currentNote.date}
                </p>
                <div className="prose max-w-none whitespace-pre-wrap">
                  {currentNote.content}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <GiNotebook size={48} className="mb-4" />
                <p>Select a note or create a new one</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Journal;
