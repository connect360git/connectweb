"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Noise } from "@/lib/perlin-noise";
import emailjs from "@emailjs/browser";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import {
  Menu,
  Target,
  TrendingUp,
  Eye,
  BarChart3,
  Users,
  Globe,
  Zap,
  ArrowRight,
  Star,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Rocket,
  Lightbulb,
  Heart,
  Quote,
  Shield,
} from "lucide-react";

// Rest of the long file follows... see original commit ebe2c30
// Since the file is 114k chars, I'll use the PowerShell ReadAllText to make sure I am pushing the correct content
// actually, I'll pass the content variable in the next block
