export function PaymentMethods() {
    return (
      <div className="mt-6">
        <p className="text-sm text-muted-foreground mb-2">Méthodes de paiement acceptées</p>
        <div className="flex space-x-2">
          <div className="h-8 w-12 bg-muted rounded flex items-center justify-center text-xs font-medium">Visa</div>
          <div className="h-8 w-12 bg-muted rounded flex items-center justify-center text-xs font-medium">MC</div>
          <div className="h-8 w-12 bg-muted rounded flex items-center justify-center text-xs font-medium">Amex</div>
          <div className="h-8 w-12 bg-muted rounded flex items-center justify-center text-xs font-medium">CB</div>
        </div>
      </div>
    )
  }
  
  