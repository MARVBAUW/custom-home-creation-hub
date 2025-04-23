
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Key } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

interface APIKey {
  id: string;
  key_value: string;
  name: string;
  is_active: boolean;
  created_at: string;
}

const APIKeyManager = () => {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAPIKeys();
  }, []);

  const fetchAPIKeys = async () => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setApiKeys(data || []);
    } catch (error) {
      console.error('Error fetching API keys:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les clés API",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      toast({
        title: "Copié !",
        description: "La clé API a été copiée dans le presse-papier",
      });
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de copier la clé",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-6">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-khaki-600"></div>
    </div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Clés API
        </CardTitle>
        <CardDescription>
          Gérez vos clés API pour l'accès aux fonctionnalités enterprise
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {apiKeys.map((key) => (
            <div
              key={key.id}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white"
            >
              <div className="space-y-1">
                <p className="font-medium">{key.name}</p>
                <p className="text-sm text-gray-500 font-mono">{key.key_value}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(key.key_value)}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copier
              </Button>
            </div>
          ))}

          {apiKeys.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              Aucune clé API trouvée
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default APIKeyManager;
