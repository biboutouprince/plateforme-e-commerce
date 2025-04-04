"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

const generalSettingsSchema = z.object({
  storeName: z.string().min(2, "Le nom de la boutique doit contenir au moins 2 caractères"),
  storeEmail: z.string().email("Veuillez entrer une adresse email valide"),
  storePhone: z.string().min(10, "Veuillez entrer un numéro de téléphone valide"),
  storeAddress: z.string().min(5, "Veuillez entrer une adresse valide"),
  storeLogo: z.string().url("Veuillez entrer une URL valide").optional().or(z.literal("")),
  storeCurrency: z.string().min(1, "Veuillez sélectionner une devise"),
  storeLanguage: z.string().min(1, "Veuillez sélectionner une langue"),
  storeDescription: z.string().optional(),
})

const paymentSettingsSchema = z.object({
  enableCreditCard: z.boolean(),
  enablePaypal: z.boolean(),
  enableBankTransfer: z.boolean(),
  enableCashOnDelivery: z.boolean(),
  paypalClientId: z.string().optional(),
  stripePublicKey: z.string().optional(),
  stripeSecretKey: z.string().optional(),
})

const shippingSettingsSchema = z.object({
  enableFreeShipping: z.boolean(),
  freeShippingThreshold: z.coerce.number().min(0, "Le seuil doit être positif ou zéro"),
  defaultShippingFee: z.coerce.number().min(0, "Les frais de livraison doivent être positifs ou zéro"),
  shippingTaxRate: z.coerce.number().min(0, "Le taux de taxe doit être positif ou zéro"),
  internationalShipping: z.boolean(),
  internationalShippingFee: z.coerce
    .number()
    .min(0, "Les frais de livraison internationaux doivent être positifs ou zéro"),
})

const emailSettingsSchema = z.object({
  smtpServer: z.string().min(1, "Veuillez entrer un serveur SMTP"),
  smtpPort: z.coerce.number().int().positive("Le port doit être un nombre entier positif"),
  smtpUsername: z.string().min(1, "Veuillez entrer un nom d'utilisateur"),
  smtpPassword: z.string().min(1, "Veuillez entrer un mot de passe"),
  emailSender: z.string().email("Veuillez entrer une adresse email valide"),
  enableOrderConfirmation: z.boolean(),
  enableShippingNotification: z.boolean(),
  enableAbandonedCartEmails: z.boolean(),
})

export default function SettingsPageClient() {
  const [activeTab, setActiveTab] = useState("general")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const generalForm = useForm<z.infer<typeof generalSettingsSchema>>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      storeName: "ElectroShop",
      storeEmail: "contact@electroshop.com",
      storePhone: "01 23 45 67 89",
      storeAddress: "123 Avenue de la République, 75011 Paris, France",
      storeLogo: "",
      storeCurrency: "EUR",
      storeLanguage: "fr",
      storeDescription: "Votre destination pour tous vos besoins en électronique.",
    },
  })

  const paymentForm = useForm<z.infer<typeof paymentSettingsSchema>>({
    resolver: zodResolver(paymentSettingsSchema),
    defaultValues: {
      enableCreditCard: true,
      enablePaypal: true,
      enableBankTransfer: false,
      enableCashOnDelivery: false,
      paypalClientId: "",
      stripePublicKey: "",
      stripeSecretKey: "",
    },
  })

  const shippingForm = useForm<z.infer<typeof shippingSettingsSchema>>({
    resolver: zodResolver(shippingSettingsSchema),
    defaultValues: {
      enableFreeShipping: true,
      freeShippingThreshold: 50,
      defaultShippingFee: 5.99,
      shippingTaxRate: 20,
      internationalShipping: false,
      internationalShippingFee: 15.99,
    },
  })

  const emailForm = useForm<z.infer<typeof emailSettingsSchema>>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues: {
      smtpServer: "smtp.example.com",
      smtpPort: 587,
      smtpUsername: "user@example.com",
      smtpPassword: "password",
      emailSender: "noreply@electroshop.com",
      enableOrderConfirmation: true,
      enableShippingNotification: true,
      enableAbandonedCartEmails: false,
    },
  })

  const onSubmitGeneral = async (data: z.infer<typeof generalSettingsSchema>) => {
    setIsSubmitting(true)
    try {
      // Simuler un délai d'envoi
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("General settings data:", data)
      toast({
        title: "Paramètres généraux mis à jour",
        description: "Les paramètres généraux ont été mis à jour avec succès.",
      })
    } catch (error) {
      console.error("Error saving general settings:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour des paramètres généraux.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const onSubmitPayment = async (data: z.infer<typeof paymentSettingsSchema>) => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Payment settings data:", data)
      toast({
        title: "Paramètres de paiement mis à jour",
        description: "Les paramètres de paiement ont été mis à jour avec succès.",
      })
    } catch (error) {
      console.error("Error saving payment settings:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour des paramètres de paiement.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const onSubmitShipping = async (data: z.infer<typeof shippingSettingsSchema>) => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Shipping settings data:", data)
      toast({
        title: "Paramètres de livraison mis à jour",
        description: "Les paramètres de livraison ont été mis à jour avec succès.",
      })
    } catch (error) {
      console.error("Error saving shipping settings:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour des paramètres de livraison.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const onSubmitEmail = async (data: z.infer<typeof emailSettingsSchema>) => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Email settings data:", data)
      toast({
        title: "Paramètres d'email mis à jour",
        description: "Les paramètres d'email ont été mis à jour avec succès.",
      })
    } catch (error) {
      console.error("Error saving email settings:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour des paramètres d'email.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Paramètres</h1>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="payment">Paiement</TabsTrigger>
          <TabsTrigger value="shipping">Livraison</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres généraux</CardTitle>
              <CardDescription>Configurez les informations générales de votre boutique.</CardDescription>
            </CardHeader>
            <Form {...generalForm}>
              <form onSubmit={generalForm.handleSubmit(onSubmitGeneral)}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={generalForm.control}
                      name="storeName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom de la boutique</FormLabel>
                          <FormControl>
                            <Input placeholder="Nom de la boutique" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="storeEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email de contact</FormLabel>
                          <FormControl>
                            <Input placeholder="email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="storePhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone</FormLabel>
                          <FormControl>
                            <Input placeholder="01 23 45 67 89" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="storeLogo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL du logo</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/logo.png" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormDescription>Laissez vide pour utiliser le nom de la boutique</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="storeCurrency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Devise</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner une devise" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="EUR">Euro (€)</SelectItem>
                              <SelectItem value="USD">Dollar américain ($)</SelectItem>
                              <SelectItem value="GBP">Livre sterling (£)</SelectItem>
                              <SelectItem value="XOF">Franc CFA (FCFA)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="storeLanguage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Langue</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner une langue" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="fr">Français</SelectItem>
                              <SelectItem value="en">Anglais</SelectItem>
                              <SelectItem value="es">Espagnol</SelectItem>
                              <SelectItem value="de">Allemand</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={generalForm.control}
                    name="storeAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse</FormLabel>
                        <FormControl>
                          <Input placeholder="Adresse de la boutique" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="storeDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Description de la boutique"
                            className="min-h-[100px]"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      "Enregistrer les modifications"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de paiement</CardTitle>
              <CardDescription>Configurez les méthodes de paiement disponibles pour vos clients.</CardDescription>
            </CardHeader>
            <Form {...paymentForm}>
              <form onSubmit={paymentForm.handleSubmit(onSubmitPayment)}>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <FormField
                      control={paymentForm.control}
                      name="enableCreditCard"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Carte de crédit</FormLabel>
                            <FormDescription>Accepter les paiements par carte de crédit (via Stripe)</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={paymentForm.control}
                      name="enablePaypal"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">PayPal</FormLabel>
                            <FormDescription>Accepter les paiements via PayPal</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={paymentForm.control}
                      name="enableBankTransfer"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Virement bancaire</FormLabel>
                            <FormDescription>Accepter les paiements par virement bancaire</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={paymentForm.control}
                      name="enableCashOnDelivery"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Paiement à la livraison</FormLabel>
                            <FormDescription>Accepter les paiements en espèces à la livraison</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium">Configuration des passerelles de paiement</h3>

                    <FormField
                      control={paymentForm.control}
                      name="stripePublicKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Clé publique Stripe</FormLabel>
                          <FormControl>
                            <Input placeholder="pk_test_..." {...field} value={field.value || ""} />
                          </FormControl>
                          <FormDescription>Nécessaire pour les paiements par carte</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={paymentForm.control}
                      name="stripeSecretKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Clé secrète Stripe</FormLabel>
                          <FormControl>
                            <Input placeholder="sk_test_..." type="password" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormDescription>Gardez cette clé confidentielle</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={paymentForm.control}
                      name="paypalClientId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client ID PayPal</FormLabel>
                          <FormControl>
                            <Input placeholder="Client ID PayPal" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormDescription>Nécessaire pour les paiements PayPal</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      "Enregistrer les modifications"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>

        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de livraison</CardTitle>
              <CardDescription>Configurez les options de livraison pour vos clients.</CardDescription>
            </CardHeader>
            <Form {...shippingForm}>
              <form onSubmit={shippingForm.handleSubmit(onSubmitShipping)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={shippingForm.control}
                    name="enableFreeShipping"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Livraison gratuite</FormLabel>
                          <FormDescription>Offrir la livraison gratuite à partir d'un certain montant</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={shippingForm.control}
                      name="freeShippingThreshold"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Seuil de livraison gratuite (€)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="0.01" {...field} />
                          </FormControl>
                          <FormDescription>Montant minimum pour la livraison gratuite</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={shippingForm.control}
                      name="defaultShippingFee"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Frais de livraison standard (€)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="0.01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={shippingForm.control}
                      name="shippingTaxRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Taux de TVA sur la livraison (%)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" max="100" step="0.1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={shippingForm.control}
                    name="internationalShipping"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Livraison internationale</FormLabel>
                          <FormDescription>Proposer la livraison à l'international</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={shippingForm.control}
                    name="internationalShippingFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frais de livraison internationale (€)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      "Enregistrer les modifications"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres d'email</CardTitle>
              <CardDescription>
                Configurez les paramètres d'envoi d'emails et les notifications automatiques.
              </CardDescription>
            </CardHeader>
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(onSubmitEmail)}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={emailForm.control}
                      name="smtpServer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Serveur SMTP</FormLabel>
                          <FormControl>
                            <Input placeholder="smtp.example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={emailForm.control}
                      name="smtpPort"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Port SMTP</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="587" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={emailForm.control}
                      name="smtpUsername"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom d'utilisateur SMTP</FormLabel>
                          <FormControl>
                            <Input placeholder="username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={emailForm.control}
                      name="smtpPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mot de passe SMTP</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={emailForm.control}
                      name="emailSender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse d'expéditeur</FormLabel>
                          <FormControl>
                            <Input placeholder="noreply@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium">Notifications automatiques</h3>

                    <FormField
                      control={emailForm.control}
                      name="enableOrderConfirmation"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Confirmation de commande</FormLabel>
                            <FormDescription>Envoyer un email de confirmation après chaque commande</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={emailForm.control}
                      name="enableShippingNotification"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Notification d'expédition</FormLabel>
                            <FormDescription>Envoyer un email lorsqu'une commande est expédiée</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={emailForm.control}
                      name="enableAbandonedCartEmails"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Emails de panier abandonné</FormLabel>
                            <FormDescription>Envoyer un rappel pour les paniers abandonnés</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      "Enregistrer les modifications"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

