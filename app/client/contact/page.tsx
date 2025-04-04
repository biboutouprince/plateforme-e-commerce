import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import ContactForm from "../../../components/client/contact-form"

export const metadata = {
  title: "Contact - ElectroShop",
  description: "Contactez notre équipe pour toute question ou assistance",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Notre équipe est à votre disposition pour répondre à toutes vos questions. N'hésitez pas à nous contacter par
          téléphone, email ou en remplissant le formulaire ci-dessous.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Téléphone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Service client :</p>
            <p className="font-medium">01 23 45 67 89</p>
            <p className="text-sm text-muted-foreground mt-2">Du lundi au vendredi, 9h-18h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Pour toute question :</p>
            <p className="font-medium">contact@electroshop.fr</p>
            <p className="text-sm text-muted-foreground mt-2">Nous répondons sous 24h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Adresse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Siège social :</p>
            <p className="font-medium">ancienne sobraga</p>
            <p className="font-medium">gabon/libreville</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
          <ContactForm />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Nos horaires d'ouverture</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Lundi - Vendredi</span>
                  </div>
                  <span className="font-medium">9h - 18h</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Samedi</span>
                  </div>
                  <span className="font-medium">10h - 17h</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Dimanche</span>
                  </div>
                  <span className="font-medium">Fermé</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/5 rounded-md">
                <h3 className="font-medium mb-2">Service après-vente</h3>
                <p className="text-sm text-muted-foreground">
                  Notre service après-vente est disponible du lundi au vendredi de 9h à 17h. Pour toute question
                  concernant une commande ou un produit, veuillez contacter notre équipe au 01 23 45 67 90.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-6">Notre localisation</h2>
            <div className="h-[300px] bg-muted rounded-lg flex items-center justify-center">
              {/* Ici, vous pouvez intégrer une carte Google Maps ou une autre carte */}
              <div className="text-center p-4">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p>ancienne sobraga / libreville</p>
                <Button variant="link" className="mt-2">
                  Voir sur Google Maps
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary/5 rounded-xl p-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">FAQ</h2>
          <p className="text-muted-foreground mb-6">
            Consultez notre section d'aide pour trouver rapidement des réponses à vos questions les plus fréquentes.
          </p>
          <Button asChild>
            <a href="/client/aide">Consulter la FAQ</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

