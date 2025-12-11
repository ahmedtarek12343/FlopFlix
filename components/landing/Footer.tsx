"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50 pt-16 pb-8">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <a href="#" className="font-semibold italic text-2xl">
              Flop<span className="text-primary font-bold">Flix</span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your ultimate destination for discovering movies and TV shows.
              Join our community and start your entertainment journey today.
            </p>
            <div className="flex gap-4 mt-2">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Twitter size={18} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Facebook size={18} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Instagram size={18} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Github size={18} />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg text-foreground">Quick Links</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/popular"
                  className="hover:text-primary transition-colors"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  href="/popular?type=tv"
                  className="hover:text-primary transition-colors"
                >
                  TV Shows
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg text-foreground">Support</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg text-foreground">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates and exclusive
              offers.
            </p>
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Enter your email"
                className="bg-background/50"
              />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} FlopFlix. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
