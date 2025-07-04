import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface ResetPasswordProps {
  url: string;
}

const ResetPassword = ({ url }: ResetPasswordProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        Reset your account password for {process.env.APP_NAME || "App Name"}
      </Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-8 px-4 max-w-[600px]">
            <Section className="bg-white rounded-lg shadow-sm p-8">
              <Heading className="text-3xl font-bold text-gray-900 text-center mb-6">
                Reset your password
              </Heading>

              <Text className="text-gray-700 text-lg mb-8 text-center">
                You are receiving this email because you requested a password
                reset for your {process.env.APP_NAME || "App Name"} account. If
                you didn't request a password reset, you can safely ignore this
                email.
              </Text>

              <Section className="text-center mb-8">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-base transition-colors"
                  href={url}
                >
                  Reset Password
                </Button>
              </Section>

              <Text className="text-gray-600 text-sm text-center mb-4">
                If you can't click the button, copy and paste this URL into your
                browser:
              </Text>
              <Text className="text-gray-600 text-sm text-center mb-8">
                <Link href={url} className="text-blue-600 break-all">
                  {url}
                </Link>
              </Text>

              <hr className="border-gray-200 mb-8" />

              <Text className="text-gray-500 text-xs text-center">
                ©2025 {process.env.APP_NAME || "App Name"}
                <br />
                <br />
                All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPassword;
