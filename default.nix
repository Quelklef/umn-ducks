{ pkgs ? import <nixpkgs> {} }: let

npmlock2nix =
  let fetched = pkgs.fetchFromGitHub {
        owner = "tweag";
        repo = "npmlock2nix";
        rev = "8ada8945e05b215f3fffbd10111f266ea70bb502";
        sha256 = "0ni3z64wf1cha7xf5vqzqfqs73qc938zvnnbn147li1m4v8pnzzx";
      };
  in import fetched { inherit pkgs; };

gitignoreSource =
  let fetched = pkgs.fetchFromGitHub {
        owner = "hercules-ci";
        repo = "gitignore.nix";
        rev = "211907489e9f198594c0eb0ca9256a1949c9d412";
        sha256 = "06j7wpvj54khw0z10fjyi31kpafkr6hi1k0di13k1xp8kywvfyx8";
      };
  in (import fetched { inherit (pkgs) lib; }).gitignoreSource;

pwd = gitignoreSource ./.;
node_modules = npmlock2nix.node_modules { src = pwd; };

in pkgs.stdenv.mkDerivation {
  name = "umn-ducks";
  src = pwd;
  installPhase = ''
    mkdir $out
    cp -r $src/. $out
    echo "NODE_PATH=${node_modules}/node_modules ${pkgs.nodejs}/bin/node ./serve.js" > $out/run.sh
    chmod +x $out/run.sh
  '';
}
