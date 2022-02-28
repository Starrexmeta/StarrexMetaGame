import {
  Avatar,
  Box,
  BoxedNextImage as Image,
  CloseIcon,
  Flex,
  HamburgerIcon,
  Link,
  MetaButton,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@metafam/ds';
import LogoImage from 'assets/logo-new.png';
import { MetaLink } from 'components/Link';
import { DesktopNavLinks } from 'components/MegaMenu/DesktopNavLinks';
import { DesktopPlayerStats } from 'components/MegaMenu/DesktopPlayerStats';
import { useMounted, useUser, useWeb3 } from 'lib/hooks';
import { useRouter } from 'next/router';
import React from 'react';
import { menuIcons } from 'utils/menuIcons';
import { MenuSectionLinks } from 'utils/menuLinks';

type LogoProps = {
  link: string;
  iconSize?: number;
};

// Navbar logo
const Logo = ({ link }: LogoProps) => {
  const w = useBreakpointValue({ base: 9, lg: 10 }) ?? 9;
  const h = useBreakpointValue({ base: 12, lg: 14 }) ?? 12;

  return (
    <Box>
      <MetaLink
        href={link}
        _focus={{ outline: 'none', bg: 'transparent' }}
        _hover={{ bg: 'transparent' }}
        _active={{ bg: 'transparent' }}
      >
        <Image
          src={LogoImage}
          transition="0.25s"
          {...{ w, h }}
          _hover={{ transform: 'scale(1.1)' }}
        />
      </MetaLink>
    </Box>
  );
};

export const MegaMenuHeader: React.FC = () => {
  const { connected, connect, connecting } = useWeb3();
  const router = useRouter();
  const { user, fetching } = useUser();
  const mounted = useMounted();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Stack
      position={
        router.pathname === '/community/players' ? 'relative' : 'sticky'
      }
      top={0}
      id="MegaMenu"
      zIndex={11}
    >
      <Flex
        borderBottom="1px"
        bg="rgba(0, 0, 0, 0.5)"
        borderColor="#2B2244"
        sx={{ backdropFilter: 'blur(10px)' }}
        px={4}
        py={1.5}
        h={20}
      >
        <Flex
          onClick={menuToggle}
          flexWrap="nowrap"
          alignItems="center"
          cursor="pointer"
          h={8}
          w={8}
          display={{ base: 'flex', lg: 'none' }}
          p={2}
          my="auto"
          grow={1}
        >
          {isOpen ? (
            <CloseIcon fontSize="2xl" color="#FFF" ml={2} />
          ) : (
            <HamburgerIcon fontSize="3xl" color="#FFF" ml={2} />
          )}
        </Flex>
        <Flex
          w={{ base: 'fit-content', lg: '100%' }}
          justify="space-between"
          align="center"
        >
          <Logo link={user ? '/dashboard' : '/'} />
          <DesktopNavLinks />
          {/* <Search /> */}
          <Box
            w={0.2}
            textAlign="right"
            display={{ base: 'none', lg: 'block' }}
          >
            {connected && !!user && !fetching && !connecting ? (
              <DesktopPlayerStats player={user} />
            ) : (
              <Stack
                fontWeight="bold"
                fontFamily="Exo 2, san-serif"
                align="center"
              >
                <MetaButton
                  h={10}
                  px={12}
                  onClick={connect}
                  isLoading={!mounted || connecting || fetching}
                >
                  Connect
                </MetaButton>
                <Text color="red"> Mainnet Required</Text>
              </Stack>
            )}
          </Box>
        </Flex>
      </Flex>
      <Stack
        display={{ base: isOpen ? 'block' : 'none', xl: 'none' }}
        position="fixed"
        top="4.5rem"
        zIndex={1}
        overflowX="hidden"
        w="100vw"
        bg="rgba(0, 0, 0, 0.8)"
        h="calc(100vh - 10rem)"
        sx={{ backdropFilter: 'blur(10px)' }}
        p="1rem"
        border="none"
      >
        {MenuSectionLinks.map((section) => (
          <Stack pt={1} key={section.label}>
            <Text fontSize={18} fontWeight={600} textTransform="capitalize">
              {section.label}
            </Text>
            <SimpleGrid columns={2}>
              {section.menuItems.map(({ title, icon, url }) => (
                <Link
                  key={title}
                  display="flex"
                  alignItems="center"
                  href={url}
                  border="1px"
                  _odd={{ marginRight: '-1px' }}
                  marginBottom="-1px"
                  borderColor="purple.400"
                  bg="rgba(0, 0, 0, 0.35)"
                  px={2}
                  py={1.5}
                  _hover={{
                    bg: 'rgba(255, 255, 255, 0.1)',
                  }}
                  isExternal={/^https?:\/\//.test(url)}
                >
                  <Avatar
                    name={title}
                    src={menuIcons[icon]}
                    p={0}
                    w={7}
                    h={7}
                    mr={1}
                    bg="linear-gradient(180deg, #170B23 0%, #350C58 100%)"
                  />
                  <Text fontSize={20}>{title}</Text>
                </Link>
              ))}
            </SimpleGrid>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
