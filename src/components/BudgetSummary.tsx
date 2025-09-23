import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { WishlistItem } from "@/types/wishlist";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface BudgetSummaryProps {
  items: WishlistItem[];
  budget: number;
  onBudgetChange: (budget: number) => void;
}

export const BudgetSummary = ({ items, budget, onBudgetChange }: BudgetSummaryProps) => {
  const totalWishlist = items.reduce((sum, item) => sum + item.price, 0);
  const totalSpent = items.filter(item => item.purchased).reduce((sum, item) => sum + item.price, 0);
  const remaining = budget - totalSpent;
  const progressPercentage = budget > 0 ? (totalSpent / budget) * 100 : 0;
  const isOverBudget = totalSpent > budget;

  const categoryTotals = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = { total: 0, spent: 0 };
    }
    acc[item.category].total += item.price;
    if (item.purchased) {
      acc[item.category].spent += item.price;
    }
    return acc;
  }, {} as Record<string, { total: number; spent: number }>);

  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Résumé du Budget
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <label htmlFor="budget" className="text-sm font-medium">
              Budget total:
            </label>
            <input
              id="budget"
              type="number"
              value={budget}
              onChange={(e) => onBudgetChange(Number(e.target.value))}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 max-w-32"
              min="0"
              step="0.01"
            />
            <span className="text-sm text-muted-foreground">€</span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {totalSpent.toFixed(2)} €
              </div>
              <div className="text-sm text-muted-foreground">Dépensé</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                isOverBudget ? 'text-destructive' : 'text-success'
              }`}>
                {remaining.toFixed(2)} €
              </div>
              <div className="text-sm text-muted-foreground">
                {isOverBudget ? 'Dépassement' : 'Restant'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-info">
                {totalWishlist.toFixed(2)} €
              </div>
              <div className="text-sm text-muted-foreground">Total wishlist</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progression du budget</span>
              <span className={isOverBudget ? 'text-destructive' : 'text-foreground'}>
                {progressPercentage.toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={Math.min(progressPercentage, 100)} 
              className={`h-2 ${isOverBudget ? '[&>div]:bg-destructive' : '[&>div]:bg-success'}`}
            />
            {isOverBudget && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <TrendingUp className="h-4 w-4" />
                Budget dépassé de {(totalSpent - budget).toFixed(2)} €
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      {Object.keys(categoryTotals).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Répartition par catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(categoryTotals).map(([category, { total, spent }]) => (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category}</span>
                    <span className="text-sm text-muted-foreground">
                      {spent.toFixed(2)} € / {total.toFixed(2)} €
                    </span>
                  </div>
                  <Progress 
                    value={(spent / total) * 100} 
                    className="h-1 [&>div]:bg-primary"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};