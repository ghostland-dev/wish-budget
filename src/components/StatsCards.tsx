import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WishlistItem } from "@/types/wishlist";
import { TrendingUp, TrendingDown, BarChart3, Target } from "lucide-react";

interface StatsCardsProps {
  items: WishlistItem[];
  budget: number;
}

export const StatsCards = ({ items, budget }: StatsCardsProps) => {
  const totalItems = items.length;
  const purchasedItems = items.filter(item => item.purchased).length;
  const totalWishlist = items.reduce((sum, item) => sum + item.price, 0);
  const totalSpent = items.filter(item => item.purchased).reduce((sum, item) => sum + item.price, 0);
  const purchaseRate = totalItems > 0 ? (purchasedItems / totalItems) * 100 : 0;
  const avgItemPrice = totalItems > 0 ? totalWishlist / totalItems : 0;

  const stats = [
    {
      title: "Articles total",
      value: totalItems.toString(),
      description: `${purchasedItems} achetés`,
      icon: BarChart3,
      color: "text-info",
      bgColor: "bg-info/10"
    },
    {
      title: "Taux d'achat",
      value: `${purchaseRate.toFixed(1)}%`,
      description: "Articles réalisés",
      icon: Target,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Prix moyen",
      value: `${avgItemPrice.toFixed(0)}€`,
      description: "Par article",
      icon: TrendingUp,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      title: "Économies",
      value: `${(totalWishlist - totalSpent).toFixed(0)}€`,
      description: "Non dépensées",
      icon: TrendingDown,
      color: "text-primary",
      bgColor: "bg-primary/10"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={stat.title} className="group hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground truncate">{stat.title}</p>
                <p className="text-lg font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};