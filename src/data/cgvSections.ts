
import { FileCheck, Hammer, ClipboardList, CreditCard, CheckCircle, Clock, UserCheck, HardHat, FileWarning, FileX, AlertTriangle, Calendar, Copyright } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface CGVSection {
  id: string;
  title: string;
  icon: LucideIcon;
  content: string[];
  list?: string[];
}

const cgvSections: CGVSection[] = [
  {
    id: 'general-conditions',
    title: 'Article 1 - Objet et champ d\'application',
    icon: ClipboardList,
    content: [
      'Les présentes Conditions Générales de Vente (CGV) constituent le socle de la relation commerciale entre la société Progineer, SARL au capital de 1 000 euros, immatriculée au RCS de Marseille sous le numéro SIRET 951 045 509 00015, dont le siège social est situé à Marseille, France (ci-après "le Prestataire") et ses clients professionnels ou particuliers (ci-après "le Client").',
      'Elles s\'appliquent à toutes les prestations de services conclues par le Prestataire auprès des Clients, quelles que soient les clauses pouvant figurer sur les documents du Client, et notamment ses conditions générales d\'achat.',
      'Conformément à la réglementation en vigueur, ces CGV sont systématiquement communiquées à tout Client qui en fait la demande, pour lui permettre de passer commande auprès du Prestataire.'
    ]
  },
  {
    id: 'services',
    title: 'Article 2 - Prestations de services',
    icon: Hammer,
    content: [
      'Les prestations de services proposées par le Prestataire sont les suivantes :'
    ],
    list: [
      'Maîtrise d\'œuvre',
      'Conception architecturale',
      'Suivi de chantier',
      'Construction sur mesure',
      'Rénovation énergétique',
      'Extension & agrandissement',
      'Optimisation d\'espace',
      'Design d\'espace',
      'Montage administratif & réglementaire'
    ]
  },
  {
    id: 'contract-formation',
    title: 'Article 3 - Formation du contrat',
    icon: FileCheck,
    content: [
      'Les devis établis par le Prestataire sont valables pendant une durée de trois (3) mois à compter de leur date d\'émission.',
      'Le contrat est formé lors de l\'acceptation, sans réserve, du devis par le Client. L\'acceptation peut prendre la forme d\'une signature du devis avec la mention "Bon pour accord", d\'un acompte ou de toute autre forme écrite.'
    ]
  },
  {
    id: 'price',
    title: 'Article 4 - Prix',
    icon: CreditCard,
    content: [
      'Les prix des services sont ceux en vigueur au jour de la passation de la commande. Ils sont libellés en euros et calculés hors taxes. Par voie de conséquence, ils seront majorés du taux de TVA et des frais de transport applicables au jour de la commande.',
      'Le Prestataire se réserve le droit de modifier ses prix à tout moment. Cependant, il s\'engage à facturer les prestations commandées aux prix indiqués lors de l\'enregistrement de la commande.'
    ]
  },
  {
    id: 'payment-terms',
    title: 'Article 5 - Modalités de paiement',
    icon: CheckCircle,
    content: [
      'Un acompte de 30% du montant total TTC est exigé lors de la passation de la commande. Le solde est payable selon l\'échéancier défini dans le contrat ou dans le devis.',
      'Les paiements peuvent être effectués par chèque, virement bancaire ou tout autre moyen convenu entre les parties.',
      'En cas de retard de paiement, des pénalités correspondant à trois fois le taux d\'intérêt légal en vigueur seront appliquées. Ces pénalités sont exigibles de plein droit, sans qu\'un rappel soit nécessaire.'
    ]
  },
  {
    id: 'execution-time',
    title: 'Article 6 - Délais d\'exécution',
    icon: Clock,
    content: [
      'Les délais d\'exécution des prestations sont donnés à titre indicatif et ne constituent pas un engagement du Prestataire. Tout retard raisonnable dans l\'exécution des prestations ne pourra donner lieu au profit du Client à une indemnisation, à l\'annulation de la commande ou à l\'application de pénalités de retard.'
    ]
  },
  {
    id: 'provider-obligations',
    title: 'Article 7 - Obligations du Prestataire',
    icon: UserCheck,
    content: [
      'Le Prestataire est tenu à une obligation de moyens dans l\'exécution de ses prestations. Il s\'engage à mettre en œuvre tous les moyens nécessaires à la bonne exécution des prestations qui lui sont confiées.',
      'Le Prestataire est tenu au respect du secret professionnel et s\'engage à ne divulguer aucune information dont il aurait connaissance dans le cadre de l\'exécution de ses prestations.'
    ]
  },
  {
    id: 'client-obligations',
    title: 'Article 8 - Obligations du Client',
    icon: UserCheck,
    content: [
      'Le Client s\'engage à collaborer activement avec le Prestataire en lui fournissant dans les meilleurs délais toutes les informations et documents nécessaires à la bonne exécution des prestations.',
      'Le Client est responsable de la véracité et de l\'exactitude des informations qu\'il communique au Prestataire.'
    ]
  },
  {
    id: 'work-reception',
    title: 'Article 9 - Réception des travaux',
    icon: HardHat,
    content: [
      'À l\'achèvement des travaux, il sera procédé à une réception contradictoire en présence du Client ou de son représentant et du Prestataire. Cette réception fera l\'objet d\'un procès-verbal signé par les deux parties.',
      'Toute réserve devra être signalée lors de la réception des travaux et mentionnée dans le procès-verbal de réception.'
    ]
  },
  {
    id: 'guarantees',
    title: 'Article 10 - Garanties',
    icon: FileWarning,
    content: [
      'Le Prestataire est assuré pour sa responsabilité civile professionnelle auprès d\'une compagnie notoirement solvable.',
      'Le Prestataire garantit le Client contre tout défaut de conformité des prestations et tout vice caché, provenant d\'un défaut de conception ou de réalisation des prestations fournies.'
    ]
  },
  {
    id: 'termination',
    title: 'Article 11 - Résiliation',
    icon: FileX,
    content: [
      'En cas de manquement par l\'une des parties à l\'une quelconque de ses obligations, l\'autre partie pourra résilier le contrat après mise en demeure adressée par lettre recommandée avec accusé de réception demeurée infructueuse pendant un délai de quinze (15) jours.'
    ]
  },
  {
    id: 'force-majeure',
    title: 'Article 12 - Force majeure',
    icon: AlertTriangle,
    content: [
      'La responsabilité du Prestataire ne pourra pas être mise en œuvre si la non-exécution ou le retard dans l\'exécution de l\'une de ses obligations décrites dans les présentes conditions générales de vente découle d\'un cas de force majeure. À ce titre, la force majeure s\'entend de tout événement extérieur, imprévisible et irrésistible au sens de l\'article 1218 du Code civil.'
    ]
  },
  {
    id: 'applicable-law',
    title: 'Article 13 - Droit applicable et juridiction compétente',
    icon: Calendar,
    content: [
      'Les présentes CGV sont soumises au droit français. Tous les litiges auxquels les opérations d\'achat et de vente conclues en application des présentes CGV pourraient donner lieu, concernant tant leur validité, leur interprétation, leur exécution, leur résiliation, leurs conséquences et leurs suites et qui n\'auraient pu être résolus entre le Prestataire et le Client seront soumis aux tribunaux compétents dans les conditions de droit commun.'
    ]
  },
  {
    id: 'client-acceptance',
    title: 'Article 14 - Acceptation du Client',
    icon: CheckCircle,
    content: [
      'Les présentes CGV sont expressément agréées et acceptées par le Client, qui déclare et reconnaît en avoir une parfaite connaissance, et renonce, de ce fait, à se prévaloir de tout document contradictoire.'
    ]
  }
];

export default cgvSections;
