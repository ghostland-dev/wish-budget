import { useState, useMemo } from "react";
import { WishlistCard } from "@/components/WishlistCard";
import { BudgetSummary } from "@/components/BudgetSummary";
import { AddItemDialog } from "@/components/AddItemDialog";
import { FilterBar } from "@/components/FilterBar";
import { WishlistItem } from "@/types/wishlist";
import { Button } from "@/components/ui/button";
import { Download, Settings, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  
  // Default categories
  const defaultCategories = [
    "Électronique",
    "Mode & Vêtements", 
    "Maison & Décoration",
    "Loisirs & Hobbies",
    "Sport & Fitness",
    "Livres & Éducation",
    "Beauté & Santé",
    "Autres"
  ];

  // State management
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [budget, setBudget] = useState<number>(1000);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showPurchased, setShowPurchased] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<WishlistItem | null>(null);

  // Get unique categories from items + defaults
  const categories = useMemo(() => {
    const itemCategories = [...new Set(items.map(item => item.category))];
    return [...new Set([...defaultCategories, ...itemCategories])];
  }, [items]);

  // Filter items based on filters
  const filteredItems = useMemo(() => {
    let filtered = items;
    
    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    filtered = filtered.filter(item => showPurchased ? item.purchased : !item.purchased);
    
    return filtered;
  }, [items, selectedCategory, showPurchased]);

  // Event handlers
  const handleAddItem = (itemData: Omit<WishlistItem, 'id' | 'createdAt'>) => {
    const newItem: WishlistItem = {
      ...itemData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setItems(prev => [...prev, newItem]);
    toast({
      title: "Article ajouté",
      description: `${newItem.name} a été ajouté à votre wishlist.`,
    });
  };

  const handleEditItem = (updatedItem: WishlistItem) => {
    setItems(prev => prev.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
    setEditingItem(null);
    toast({
      title: "Article modifié",
      description: `${updatedItem.name} a été mis à jour.`,
    });
  };

  const handleTogglePurchased = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
    const item = items.find(item => item.id === id);
    if (item) {
      toast({
        title: item.purchased ? "Article remis en wishlist" : "Article acheté",
        description: `${item.name} ${item.purchased ? "n'est plus marqué comme acheté" : "est maintenant marqué comme acheté"}.`,
      });
    }
  };

  const handleDeleteItem = (id: string) => {
    const item = items.find(item => item.id === id);
    setItems(prev => prev.filter(item => item.id !== id));
    if (item) {
      toast({
        title: "Article supprimé",
        description: `${item.name} a été supprimé de votre wishlist.`,
        variant: "destructive"
      });
    }
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['Nom', 'Catégorie', 'Prix', 'Lien', 'Image', 'Acheté'],
      ...items.map(item => [
        item.name,
        item.category,
        item.price.toString(),
        item.link || '',
        item.imageUrl || '',
        item.purchased ? 'Oui' : 'Non'
      ])
    ];
    
    const csvString = csvContent.map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n');
    
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wishlist.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export réussi",
      description: "Votre wishlist a été exportée en CSV.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  Ma Wishlist
                </h1>
                <p className="text-muted-foreground">
                  Gérez vos envies et votre budget en toute simplicité
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleExportCSV}>
                <Download className="h-4 w-4 mr-2" />
                Exporter CSV
              </Button>
              <AddItemDialog
                categories={categories}
                onAddItem={handleAddItem}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with budget */}
          <div className="lg:col-span-1">
            <BudgetSummary
              items={items}
              budget={budget}
              onBudgetChange={setBudget}
            />
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filters */}
            <FilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              showPurchased={showPurchased}
              onShowPurchasedChange={setShowPurchased}
            />

            {/* Items grid */}
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Heart className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {items.length === 0 
                    ? "Votre wishlist est vide" 
                    : showPurchased 
                      ? "Aucun article acheté"
                      : selectedCategory
                        ? "Aucun article dans cette catégorie"
                        : "Aucun article à afficher"
                  }
                </h3>
                <p className="text-muted-foreground mb-4">
                  {items.length === 0 
                    ? "Commencez par ajouter vos premiers articles souhaités"
                    : "Essayez de modifier vos filtres"
                  }
                </p>
                {items.length === 0 && (
                  <AddItemDialog
                    categories={categories}
                    onAddItem={handleAddItem}
                  />
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <WishlistCard
                    key={item.id}
                    item={item}
                    onTogglePurchased={handleTogglePurchased}
                    onEdit={setEditingItem}
                    onDelete={handleDeleteItem}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Edit dialog */}
        {editingItem && (
          <AddItemDialog
            categories={categories}
            onAddItem={handleAddItem}
            editItem={editingItem}
            onEditItem={handleEditItem}
            onClose={() => setEditingItem(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
