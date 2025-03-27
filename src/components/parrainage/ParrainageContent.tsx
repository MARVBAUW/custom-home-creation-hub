
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Gift, Users, CreditCard } from 'lucide-react';

const ParrainageContent = () => {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Programme de parrainage Progineer</h2>
        <p className="text-gray-600 mb-4">
          Vous avez apprécié nos services et souhaitez nous recommander à votre entourage ? 
          Notre programme de parrainage vous récompense pour chaque nouveau client que vous nous présentez.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <Card className="bg-white hover:shadow-md transition-shadow">
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Recommandez-nous</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600">
                Parlez de Progineer à vos amis, votre famille ou vos collègues qui ont un projet de construction ou rénovation.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white hover:shadow-md transition-shadow">
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Ils nous contactent</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600">
                Votre filleul nous contacte en mentionnant votre nom ou en utilisant votre code de parrainage unique.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white hover:shadow-md transition-shadow">
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Projet concrétisé</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600">
                Lorsque votre filleul signe un contrat avec nous et que le premier acompte est versé, votre récompense est validée.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white hover:shadow-md transition-shadow">
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle className="text-xl">Vous êtes récompensé</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600">
                Recevez votre prime de parrainage selon le barème, sans limite du nombre de parrainages.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-khaki-50 p-8 rounded-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Barème des commissions</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-khaki-200">
                <th className="p-4 text-khaki-800">Type de projet</th>
                <th className="p-4 text-khaki-800">Montant du projet</th>
                <th className="p-4 text-khaki-800">Prime de parrainage</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-khaki-100">
                <td className="p-4">Construction neuve</td>
                <td className="p-4">{">"} 250 000 €</td>
                <td className="p-4 font-semibold">800 €</td>
              </tr>
              <tr className="border-b border-khaki-100">
                <td className="p-4">Construction neuve</td>
                <td className="p-4">150 000 € - 250 000 €</td>
                <td className="p-4 font-semibold">500 €</td>
              </tr>
              <tr className="border-b border-khaki-100">
                <td className="p-4">Construction neuve</td>
                <td className="p-4">{"<"} 150 000 €</td>
                <td className="p-4 font-semibold">300 €</td>
              </tr>
              <tr className="border-b border-khaki-100">
                <td className="p-4">Rénovation complète</td>
                <td className="p-4">{">"} 100 000 €</td>
                <td className="p-4 font-semibold">400 €</td>
              </tr>
              <tr className="border-b border-khaki-100">
                <td className="p-4">Rénovation complète</td>
                <td className="p-4">50 000 € - 100 000 €</td>
                <td className="p-4 font-semibold">250 €</td>
              </tr>
              <tr className="border-b border-khaki-100">
                <td className="p-4">Rénovation partielle</td>
                <td className="p-4">{">"} 30 000 €</td>
                <td className="p-4 font-semibold">150 €</td>
              </tr>
              <tr>
                <td className="p-4">Extension / Surélévation</td>
                <td className="p-4">Tous montants</td>
                <td className="p-4 font-semibold">300 €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Comment participer ?</h2>
        <p className="text-gray-600 mb-6">
          Participer à notre programme de parrainage est simple et ne vous prendra que quelques minutes.
        </p>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <ol className="list-decimal ml-6 space-y-4">
            <li className="text-gray-700">
              <span className="font-medium">Inscrivez-vous</span> - Contactez-nous pour vous inscrire au programme de parrainage et recevoir votre code personnel.
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Partagez votre code</span> - Communiquez votre code à vos proches ayant un projet de construction ou rénovation.
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Suivez vos parrainages</span> - Une fois votre filleul inscrit, vous pourrez suivre l'avancement dans votre espace client.
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Recevez votre récompense</span> - La prime vous sera versée dès que le projet de votre filleul sera confirmé.
            </li>
          </ol>
        </div>
      </section>

      <section className="bg-green-50 p-8 rounded-xl border border-green-100">
        <h2 className="text-2xl font-semibold mb-4 text-center text-green-800">Conditions du programme</h2>
        <div className="space-y-4">
          <p className="text-green-700">
            <strong>Éligibilité :</strong> Le programme est ouvert à tous, clients ou non-clients de Progineer.
          </p>
          <p className="text-green-700">
            <strong>Validation :</strong> Le parrainage est validé lorsque votre filleul signe un contrat avec Progineer et verse le premier acompte.
          </p>
          <p className="text-green-700">
            <strong>Versement :</strong> La prime de parrainage est versée par virement bancaire ou chèque dans les 30 jours suivant la validation.
          </p>
          <p className="text-green-700">
            <strong>Limite :</strong> Aucune limite au nombre de personnes que vous pouvez parrainer.
          </p>
          <p className="text-green-700">
            <strong>Important :</strong> Le filleul doit mentionner votre nom ou code de parrainage lors de son premier contact avec nous.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ParrainageContent;
