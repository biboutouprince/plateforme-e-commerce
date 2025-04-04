import Link from "next/link"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card"
import { CheckCircle } from "lucide-react"

export const metadata = {
  title: "Confirmation de commande - ElectroShop",
  description: "Votre commande a été confirmée",
}

export default function OrderConfirmationPage() {
  // Dans une application réelle, ces données viendraient de la base de données
  const orderDetails = {
    orderNumber: "ORD-" + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleDateString(),
    email: "client@example.com",
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card className="border-green-200 shadow-lg">
          <CardHeader className="text-center border-b pb-6">
            <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-700">Commande confirmée</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <p className="text-center text-muted-foreground">
                Merci pour votre commande ! Nous avons bien reçu votre paiement et nous préparons votre colis.
              </p>

              <div className="bg-muted p-4 rounded-md">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Numéro de commande</p>
                    <p className="font-medium">{orderDetails.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{orderDetails.date}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{orderDetails.email}</p>
                  </div>
                </div>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Un email de confirmation a été envoyé à votre adresse email. Vous pouvez suivre l'état de votre commande
                dans votre espace client.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center border-t pt-6">
            <Button asChild>
              <Link href="/client/compte/commandes">Voir mes commandes</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/client">Retour à l'accueil</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

