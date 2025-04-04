import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">ElectroShop</h3>
            <p className="text-muted-foreground mb-4">
              Votre destination pour tous vos besoins en électronique. Qualité, service et prix compétitifs.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/client" className="text-muted-foreground hover:text-primary">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/client/produits" className="text-muted-foreground hover:text-primary">
                  Produits
                </Link>
              </li>
              <li>
                <Link href="/client/categories" className="text-muted-foreground hover:text-primary">
                  Catégories
                </Link>
              </li>
              <li>
                <Link href="/client/promotions" className="text-muted-foreground hover:text-primary">
                  Promotions
                </Link>
              </li>
              <li>
                <Link href="/client/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Informations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/client/a-propos" className="text-muted-foreground hover:text-primary">
                  À propos de nous
                </Link>
              </li>
              <li>
                <Link href="/client/livraison" className="text-muted-foreground hover:text-primary">
                  Livraison
                </Link>
              </li>
              <li>
                <Link href="/client/confidentialite" className="text-muted-foreground hover:text-primary">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/client/conditions" className="text-muted-foreground hover:text-primary">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link href="/client/retours" className="text-muted-foreground hover:text-primary">
                  Politique de retour
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Inscrivez-vous pour recevoir nos dernières offres et nouveautés.
            </p>
            <div className="flex flex-col space-y-2">
              <Input type="email" placeholder="Votre email" />
              <Button>S'abonner</Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ElectroShop. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

