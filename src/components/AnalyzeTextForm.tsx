"use client";

import {useState} from "react";
import {analyzeTextForImprovements} from "@/ai/flows/analyze-text-for-improvements";
import {rewriteTextWithStrategy} from "@/ai/flows/rewrite-text-with-strategy";
import {explainAiChanges} from "@/ai/flows/explain-ai-changes";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Separator} from "@/components/ui/separator";
import {useToast} from "@/hooks/use-toast";

const writingStrategies = [
  "improve clarity",
  "add persuasiveness",
  "narrative transformation",
  "improve conciseness",
  "add emphasis",
];

export function AnalyzeTextForm() {
  const [originalText, setOriginalText] = useState("");
  const [rewrittenText, setRewrittenText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [explanation, setExplanation] = useState("");
  const [selectedStrategy, setSelectedStrategy] = useState(writingStrategies[0]);
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast();

  const handleAnalyzeText = async () => {
    setIsLoading(true);
    try {
      const analysisResult = await analyzeTextForImprovements({text: originalText});
      setAnalysis(analysisResult.analysis);

      const rewriteResult = await rewriteTextWithStrategy({
        text: originalText,
        strategy: selectedStrategy,
      });
      setRewrittenText(rewriteResult.rewrittenText);
      setExplanation(rewriteResult.explanation || "");

      toast({
        title: "Text analysis and rewriting complete!",
        description: "Check out the results below.",
      });
    } catch (error: any) {
      console.error("Error during analysis:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to analyze and rewrite text.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Enter Text</CardTitle>
          <CardDescription>Analyze and rewrite your text with AI.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Textarea
            placeholder="Enter your text here..."
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
          />
          <Select onValueChange={setSelectedStrategy} defaultValue={selectedStrategy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select writing strategy" />
            </SelectTrigger>
            <SelectContent>
              {writingStrategies.map((strategy) => (
                <SelectItem key={strategy} value={strategy}>
                  {strategy}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleAnalyzeText} disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Analyze Text"}
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Original Text</CardTitle>
            <CardDescription>Your original input text.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{originalText}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI-Rewritten Text</CardTitle>
            <CardDescription>AI-rewritten text based on selected strategy.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{rewrittenText}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Analysis</CardTitle>
          <CardDescription>Text analysis and identified improvements.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{analysis}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Explanation of Changes</CardTitle>
          <CardDescription>Explanation of changes made by AI.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{explanation}</p>
        </CardContent>
      </Card>
      <Separator />
    </div>
  );
}
