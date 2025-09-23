import { Check, ExternalLink, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WishlistItem } from "@/types/wishlist";
import { useState } from "react";

interface WishlistCardProps {
  item: WishlistItem;
  onTogglePurchased: (id: string) => void;
  onEdit: (item: WishlistItem) => void;
  onDelete: (id: string) => void;
}

export const WishlistCard = ({ item, onTogglePurchased, onEdit, onDelete }: WishlistCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 ${
      item.purchased ? 'opacity-60' : ''
    }`}>
      <CardContent className="p-0">
        {/* Image */}
        {item.imageUrl && !imageError ? (
          <div className="relative h-48 overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
            {item.purchased && (
              <div className="absolute inset-0 bg-success/20 flex items-center justify-center">
                <div className="bg-success rounded-full p-2">
                  <Check className="h-6 w-6 text-success-foreground" />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <div className="text-muted-foreground text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-muted-foreground/10 rounded-lg flex items-center justify-center">
                📦
              </div>
              <p className="text-sm">Pas d'image</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`font-semibold text-lg leading-tight ${
                item.purchased ? 'line-through text-muted-foreground' : 'text-foreground'
              }`}>
                {item.name}
              </h3>
              <Badge variant="secondary" className="mt-1">
                {item.category}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">
              {item.price.toFixed(2)} €
            </div>
            <div className="flex items-center gap-2">
              {item.link && (
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                >
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(item)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button
            variant={item.purchased ? "secondary" : "default"}
            className="w-full"
            onClick={() => onTogglePurchased(item.id)}
          >
            {item.purchased ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Acheté
              </>
            ) : (
              'Marquer comme acheté'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};