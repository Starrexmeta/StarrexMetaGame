import { Box, Button, Container, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/unplug-background.png';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { BsArrowDown } from 'react-icons/bs';

export const Unplug: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref, '300px');
  const { push } = useRouter();

  const handleSectionNav = (sectionId: string) => {
    push(`#${sectionId}`);
  };

  return (
    <Container
      id="section-10"
      position="relative"
      centerContent
      h="100vh"
      maxW="full"
      backgroundImage={`url(${BackgroundImage})`}
      bgPosition="center"
      bgSize="cover"
    >
      <Container
        d="flex"
        maxW={{ base: '100%', md: '7xl', '2xl': '8xl' }}
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          ref={ref}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          fontSize={{ base: '1.5rem', md: '2.5rem', '2xl': '3rem' }}
          lineHeight={{ base: '2.25rem', md: '3.5rem', '2xl': '4rem' }}
          maxWidth="5xl"
          pl={{ base: 0, md: 0 }}
          zIndex={100}
          transform={`translate3d(0, ${onScreen ? '0' : '20vh'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
        >
          <Text pt="8.125rem" pb="2.188rem" textAlign="center">
            So unplug yourself from the matrix & enter the future.
          </Text>

          <Text textAlign="center" className="gradient-text">
            learn, earn & make a difference.
          </Text>
        </Box>
      </Container>
      <Box
        pos="absolute"
        bottom="0"
        py={20}
        maxW={{ base: '100%', md: '7xl', '2xl': '8xl' }}
        zIndex={200}
        centerContent
      >
        <Button
          colorScheme="white"
          size="lg"
          rightIcon={<BsArrowDown />}
          onClick={() => handleSectionNav('section-11')}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};
