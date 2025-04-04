import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "À propos - ElectroShop",
  description: "Découvrez l'histoire et les valeurs d'ElectroShop",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">À propos d'ElectroShop</h1>

        <div className="relative h-[300px] mb-8 rounded-lg overflow-hidden">
          <Image
            src="/images/equipe.png?height=500&width=1200&text=Notre+Histoire"
            alt="Notre histoire"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Notre histoire</h2>
            <p className="text-muted-foreground mb-4">
              Fondée en 2010, ElectroShop est née de la passion de trois amis pour la technologie et l'innovation. Ce
              qui a commencé comme une petite boutique dans le centre-ville s'est rapidement développé pour devenir l'un
              des leaders de la vente d'électronique en ligne dans la région.
            </p>
            <p className="text-muted-foreground">
              Au fil des années, nous avons constamment évolué pour offrir à nos clients les dernières innovations
              technologiques tout en maintenant notre engagement envers un service client exceptionnel et des prix
              compétitifs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Notre mission</h2>
            <p className="text-muted-foreground">
              Chez ElectroShop, notre mission est de rendre la technologie accessible à tous. Nous croyons que chacun
              devrait pouvoir profiter des avantages de la technologie moderne, c'est pourquoi nous nous efforçons de
              proposer une large gamme de produits à des prix abordables, accompagnés de conseils d'experts pour vous
              aider à faire les meilleurs choix.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <div className="bg-muted p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-primary mb-2">10+</div>
              <p className="text-muted-foreground">Années d'expérience</p>
            </div>
            <div className="bg-muted p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-primary mb-2">50k+</div>
              <p className="text-muted-foreground">Clients satisfaits</p>
            </div>
            <div className="bg-muted p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-primary mb-2">5000+</div>
              <p className="text-muted-foreground">Produits disponibles</p>
            </div>
          </div>

          <section>
            <h2 className="text-2xl font-bold mb-4">Notre équipe</h2>
            <p className="text-muted-foreground mb-6">
              Notre équipe est composée de passionnés de technologie, d'experts en électronique et de professionnels du
              service client dévoués. Ensemble, nous travaillons pour vous offrir la meilleure expérience d'achat
              possible.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Jean ",
                  role: "Fondateur & CEO",
                  image: "/images/ceo.png?height=300&width=300&text=JD",
                },
                {
                  name: "Marie ",
                  role: "Directrice Marketing",
                  image: "/images/directrice.png?height=300&width=300&text=MM",
                },
                {
                  name: "Thomas ",
                  role: "Responsable Technique",
                  image: "/images/tec.png?height=300&width=300&text=TB",
                },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Nos valeurs</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold">Qualité</h3>
                  <p className="text-muted-foreground">
                    Nous ne proposons que des produits de qualité, soigneusement sélectionnés et testés.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold">Service client</h3>
                  <p className="text-muted-foreground">
                    Nous sommes dévoués à offrir un service client exceptionnel avant, pendant et après l'achat.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold">Innovation</h3>
                  <p className="text-muted-foreground">
                    Nous restons à la pointe de la technologie pour vous offrir les dernières innovations.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold">Durabilité</h3>
                  <p className="text-muted-foreground">
                    Nous nous engageons à réduire notre impact environnemental et à promouvoir des pratiques durables.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          <div className="bg-muted p-8 rounded-lg text-center mt-12">
            <h2 className="text-2xl font-bold mb-4">Rejoignez la famille ElectroShop</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Découvrez notre large gamme de produits électroniques et bénéficiez d'un service client exceptionnel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/client/produits">Découvrir nos produits</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/client/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

