import { Mail, MapPin, Phone, Send } from "lucide-react";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Container } from "./container";
import { Section, SectionHeading } from "./section";

interface ContactInfo {
  email?: string;
  phone?: string;
  location?: string;
  socials?: Array<{
    platform: string;
    url: string;
    icon?: React.ReactNode;
  }>;
}

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  contactInfo?: ContactInfo;
  showForm?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
}

export function ContactSection({
  title = "Get In Touch",
  subtitle = "Have a question or want to work together? Feel free to contact me!",
  contactInfo,
  showForm = true,
  primaryColor,
  secondaryColor,
}: ContactSectionProps) {
  return (
    <Section id="contact">
      <SectionHeading level={2} color={primaryColor}>
        {title}
      </SectionHeading>
      {subtitle && (
        <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
          {subtitle}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        {contactInfo && (
          <Container className="p-6">
            <div className="space-y-4">
              {contactInfo.email && (
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                    style={{
                      backgroundColor: `${primaryColor || "#3b82f6"}20`,
                      color: primaryColor || "#3b82f6",
                    }}
                  >
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Email
                    </h3>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-base hover:underline"
                      style={{ color: primaryColor }}
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              )}

              {contactInfo.phone && (
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                    style={{
                      backgroundColor: `${primaryColor || "#3b82f6"}20`,
                      color: primaryColor || "#3b82f6",
                    }}
                  >
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Phone
                    </h3>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-base hover:underline"
                      style={{ color: primaryColor }}
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
              )}

              {contactInfo.location && (
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                    style={{
                      backgroundColor: `${primaryColor || "#3b82f6"}20`,
                      color: primaryColor || "#3b82f6",
                    }}
                  >
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Location
                    </h3>
                    <p className="text-base">{contactInfo.location}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Location
                    </h3>
                    <p className="text-base">{contactInfo.location}</p>
                  </div>
                </div>
              )}

              {contactInfo.socials && contactInfo.socials.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                    Connect on Social Media
                  </h3>
                  <div className="flex gap-3">
                    {contactInfo.socials.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: `${secondaryColor || "#3b82f6"}20`,
                          color: secondaryColor || "#3b82f6",
                        }}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Container>
        )}

        {/* Contact Form */}
        {showForm && (
          <Container className="p-6">
            <form className="space-y-4">
              <div>
                <Input placeholder="Your Name" className="w-full" />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="w-full"
                />
              </div>
              <div>
                <Input placeholder="Subject" className="w-full" />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  className="w-full min-h-[120px]"
                />
              </div>
              <div>
                <Button
                  type="submit"
                  className="w-full flex items-center justify-center"
                  style={{ backgroundColor: primaryColor || "#3b82f6" }}
                >
                  <Send size={16} className="mr-2" />
                  Send Message
                </Button>
              </div>
            </form>
          </Container>
        )}
      </div>
    </Section>
  );
}
