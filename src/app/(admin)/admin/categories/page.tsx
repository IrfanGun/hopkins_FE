"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, ChevronRight, ChevronDown } from "lucide-react";
import { fetchCategories as initialCategories } from "../../../../lib/categories";
import CategoryModal from "../layout/CategoryModal";
import EditSubcategoryModal from "../layout/EditSubcategoryModal";
import DeleteModal from "../layout/DeleteModal";
import AddSubcategoryModal from "../layout/AddSubcategoryModal";
import axiosInstance from "src/api/axiosInstance";
import { Category, SubCategory } from "../../../../lib/types";
import { formatCategories } from "src/lib/formatCategories";
import axios from "axios";


// interface SubCategory {
//   id: number;
//   name: string;
  
// }

// interface Category {
//   id: number;
//   name: string;
//   subcategories: SubCategory[];
// }



export default function CategoriesPage() {



  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    id : number;
    type: "category" | "subcategory";
    name: string;
    categoryName?: string;
    id_subcategory ? :number;
  } | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddSubcategoryModal, setShowAddSubcategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [showEditSubcategoryModal, setShowEditSubcategoryModal] =
    useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<SubCategory | null>(
    null,
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  
  useEffect(() => {


    const loadCategories = async () => {
      const cats = await initialCategories();
      const formattedCategories = formatCategories(cats); 
      setCategories(formattedCategories); 
    };

    loadCategories(); 
  }, []); 

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName],
    );
  };

  const handleAddCategory = async() => {
    try {
      const response = await axiosInstance.post("/api/category", {
        name: newCategoryName,
      });
      
        const loadCategories = async () => {
        const cats = await initialCategories();
        const formattedCategories = formatCategories(cats); 
        setCategories(formattedCategories); 
      };
      
      setNewCategoryName("");
      setShowAddCategoryModal(false);
      loadCategories(); 

     
    } catch (error: any) {
      if (error.response) {
       
        console.error("Server Error:", error.response.data);

      } else if (error.request) {
        console.error("No Response from Server:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    
      return null;
    }
  };

  const handleEditCategory = async() => {
   
    try {
      if (!selectedCategory) return;

      const response = await axiosInstance.put(`/api/category/${selectedCategory.id}`, {
        name: newCategoryName,
      });
      setShowEditCategoryModal(false);
      setNewCategoryName("");
      
      const loadCategories = async () => {
        const cats = await initialCategories();
        const formattedCategories = formatCategories(cats); 
        setCategories(formattedCategories); 
      };
  
      loadCategories(); 

    } catch (error: any) {
      console.log(error);
    }
   
  };

  const handleEditSubcategory = async ( ) => {
    

  
    try {
     
    if (!selectedSubcategory) return;
      const response = await axiosInstance.put(`/api/subcategory/${selectedSubcategory.id}`, {
        id : selectedSubcategory.id,
        name: newSubcategoryName,
        
      });
      const loadCategories = async () => {
        const cats = await initialCategories();
        const formattedCategories = formatCategories(cats); 
        setCategories(formattedCategories); 
      };

      setShowEditSubcategoryModal(false);
      setNewSubcategoryName("");
      
      loadCategories();


    } catch (error: any) {
      console.log(error);
    }

    const updated = await initialCategories();
    const loadCategories = async () => {
      const cats = await initialCategories();
      const formattedCategories = formatCategories(cats); 
      setCategories(formattedCategories); 
    };

    loadCategories(); 
    setShowEditSubcategoryModal(false);
  };

  const handleDeleteCategory = async (id : Number) => {
   
   try {

      const response = await axiosInstance.delete(`api/category/${id}`, {
        headers : {
          Authorization : `Bearer YOUR_ACCESS_TOKEN`,
        }
      });
      setShowDeleteModal(false);
      setNewCategoryName("");
      
      const loadCategories = async () => {
        const cats = await initialCategories();
        const formattedCategories = formatCategories(cats); 
        setCategories(formattedCategories); 
      };
  
      loadCategories(); 
      
      

   } catch (error) {
    console.error("Error deleting category:", error);
    // Handle error appropriately, e.g., show a notification to the user
    
   }

   

  };

  const handleDeleteSubcategory = async (id : Number) => 
  {
    console.log(id);
    try {

      const response = await axiosInstance.delete(`api/subcategory/${id}`, {
        headers : {
          Authorization : `Bearer YOUR_ACCESS_TOKEN`,
        }
      })

      const loadCategories = async () => {
        const cats = await initialCategories();
        const formattedCategories = formatCategories(cats); 
        setCategories(formattedCategories); 
      };
  
      loadCategories(); 
      setShowDeleteModal(false);

    } catch (error) {
      console.log(error);
    }
  };

  const handleAddSubcategory = async(category_id : number, name : string ) => {
    

    try  {
    const response = await axiosInstance.post("/api/subcategory", {
      name: name,
      category_id: category_id,
    });

    setNewSubcategoryName("");
    const loadCategories = async () => {
      const cats = await initialCategories();
      const formattedCategories = formatCategories(cats); 
      setCategories(formattedCategories); 
    };

    loadCategories(); 
   
    setShowAddSubcategoryModal(false);

    } catch (error: any) { 
      console.log(error);
    }



  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Categories Management
        </h1>
        <button
          onClick={() => setShowAddCategoryModal(true)}
          className="flex items-center rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </button>
      </div>

      <div className="rounded-lg border bg-white shadow">
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between border-b pb-2">
            <div className="font-medium text-gray-700">
              Categories and Subcategories
            </div>
            <div className="text-sm text-gray-500">
              {categories.length} categories
            </div>
          </div>

          <ul className="divide-y divide-gray-200">
            {categories.map((cat) => (
              <li key={cat.name} className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      onClick={() => toggleCategory(cat.name)}
                      className="mr-2 rounded-md p-1 hover:bg-gray-100"
                    >
                      {expandedCategories.includes(cat.name) ? (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                    <span className="font-medium">{cat.name}</span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({cat.subcategories.length})
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowAddSubcategoryModal(true);
                      }}
                      className="p-1 text-gray-500 hover:text-orange-500"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCategory(cat);
                        setNewCategoryName(cat.name);
                        setShowEditCategoryModal(true);
                      }}
                      className="p-1 text-gray-500 hover:text-blue-500"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteTarget({ type: "category", name: cat.name, id : cat.id });
                        setShowDeleteModal(true); // ⬅️ Tambahkan ini
                      }}
                      className="p-1 text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {expandedCategories.includes(cat.name) && (
                  <ul className="mt-2 space-y-1 pl-6">
                    {cat.subcategories.map((sub) => (
                      <li
                        key={sub.id}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-700">{sub.name}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedCategory(cat);
                              setSelectedSubcategory(sub);
                              setNewSubcategoryName(sub.name);
                              setShowEditSubcategoryModal(true);
                            }}
                            className="p-1 text-gray-500 hover:text-blue-500"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteTarget({
                                id : cat.id,
                                type: "subcategory",
                                name: sub.name,
                                categoryName: cat.name,
                                id_subcategory : sub.id
                              });
                              setShowDeleteModal(true); // ⬅️ Tambahkan ini
                            }}
                            className="p-1 text-gray-500 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showAddCategoryModal && (
        <CategoryModal
          title="Add New Category"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          onCancel={() => setShowAddCategoryModal(false)}
          onSubmit={handleAddCategory}
          confirmText="Add"
        />
      )}

      {showEditCategoryModal && selectedCategory && (
        <CategoryModal
          title="Edit Category"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          onCancel={() => setShowEditCategoryModal(false)}
          onSubmit={handleEditCategory}
          confirmText="Save Changes"
        />
      )}

      {showEditSubcategoryModal && selectedCategory && selectedSubcategory && (
        <EditSubcategoryModal
          value={newSubcategoryName}
          onChange={(e) => setNewSubcategoryName(e.target.value)}
          onSubmit={handleEditSubcategory}
          onCancel={() => setShowEditSubcategoryModal(false)}
        />
      )}

      {showDeleteModal && deleteTarget && (
        <DeleteModal
          title={`Delete ${deleteTarget.type === "category" ? "Category" : "Subcategory"}`}
          message={`Are you sure you want to delete "${deleteTarget.name}"?`}
          onCancel={() => {
            setShowDeleteModal(false);
            setDeleteTarget(null);
          }}
          onConfirm={async () => {
            
            if (deleteTarget.type === "category") {
             
            
            await handleDeleteCategory(deleteTarget.id); 
            console.log("Deleting category:", deleteTarget.id);
              
              
            } else if (
              deleteTarget.type === "subcategory" &&
              deleteTarget.categoryName
            ) {
             
              if (deleteTarget.id_subcategory !== undefined) {
                await handleDeleteSubcategory(deleteTarget.id_subcategory);
              }
            }

          
          }}
        />
      )}
      {showAddSubcategoryModal && selectedCategory && (
        <AddSubcategoryModal
          title="Add New Subcategory"
          value={newSubcategoryName}
          onChange={(e) => setNewSubcategoryName(e.target.value)}
          onCancel={() => setShowAddSubcategoryModal(false)}
          onSubmit={() => {
            if (selectedCategory && newSubcategoryName.trim()) {
              handleAddSubcategory(selectedCategory.id, newSubcategoryName);
            }
          }}
          confirmText="Add"
        />
      )}
    </div>
  );
}
