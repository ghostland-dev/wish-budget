import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Settings, Plus, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface SettingsDialogProps {
  categories: string[];
  onAddCategory: (category: string) => void;
  onRemoveCategory: (category: string) => void;
}

export const SettingsDialog = ({ categories, onAddCategory, onRemoveCategory }: SettingsDialogProps) => {
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [darkMode, setDarkMode] = useState(false);

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

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      onAddCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  const canRemoveCategory = (category: string) => {
    return !defaultCategories.includes(category);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Paramètres
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Paramètres de l'application</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Theme Settings */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Apparence</Label>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Mode sombre</Label>
                <p className="text-sm text-muted-foreground">
                  Basculer entre le thème clair et sombre
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </div>

          {/* Categories Settings */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Catégories personnalisées</Label>
            
            <div className="flex gap-2">
              <Input
                placeholder="Nouvelle catégorie..."
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
              />
              <Button onClick={handleAddCategory} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {category}
                  {canRemoveCategory(category) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1 hover:bg-destructive/20"
                      onClick={() => onRemoveCategory(category)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </Badge>
              ))}
            </div>
            
            <p className="text-sm text-muted-foreground">
              Les catégories par défaut ne peuvent pas être supprimées
            </p>
          </div>

          {/* Export Settings */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Options d'export</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch id="include-images" defaultChecked />
                <Label htmlFor="include-images">Inclure les URL d'images</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="include-links" defaultChecked />
                <Label htmlFor="include-links">Inclure les liens produits</Label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={() => setOpen(false)}>
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};