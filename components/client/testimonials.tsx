import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "Cliente fidèle",
    avatar: "/placeholder.svg?height=100&width=100&text=SM",
    content:
      "J'achète régulièrement chez ElectroShop et je suis toujours satisfaite de la qualité des produits et du service client. La livraison est rapide et le site est très facile à utiliser.",
  },
  {
    id: 2,
    name: "Thomas Dubois",
    role: "Professionnel",
    avatar: "/placeholder.svg?height=100&width=100&text=TD",
    content:
      "En tant que professionnel de l'informatique, je suis exigeant sur la qualité des produits. ElectroShop propose un excellent rapport qualité-prix et un service après-vente impeccable.",
  },
  {
    id: 3,
    name: "Julie Leroy",
    role: "Étudiante",
    avatar: "/placeholder.svg?height=100&width=100&text=JL",
    content:
      "J'ai acheté mon ordinateur portable pour mes études sur ElectroShop. Les conseils étaient pertinents et j'ai trouvé exactement ce dont j'avais besoin à un prix abordable.",
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ce que disent nos clients</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez les témoignages de nos clients satisfaits qui nous font confiance pour leurs achats
            d'électronique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex-grow">
                  <p className="text-muted-foreground">{testimonial.content}</p>
                </div>
                <div className="flex text-yellow-400 mt-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

