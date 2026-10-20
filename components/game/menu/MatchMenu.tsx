"use client";
import DarkModeToggle from "@/components/controls/DarkModeToggle";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGameStore } from "@/store";
import { TeamNames } from "@/store/types";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  Bars3Icon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const menuRow =
  "flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-left text-sm hover:bg-gray-100 dark:hover:bg-slate-800";

const MatchMenu = ({ className }: { className?: string }) => {
  const { match, updateTeamName, resetMatchData } = useGameStore();
  // Reset is a basic-mode convenience only. An advanced match has real setup
  // invested, so wiping it from a menu would be a footgun.
  const isBasic = match.mode === "basic";

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [namesOpen, setNamesOpen] = useState<boolean>(false);
  const [confirmReset, setConfirmReset] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [teamNames, setTeamNames] = useState<TeamNames>({
    homeTeamName: match.home.name,
    awayTeamName: match.away.name,
  });

  // The menu stays mounted, so refill the form from the store each time it
  // opens rather than trusting state from the last time it was used.
  useEffect(() => {
    if (isOpen) {
      setTeamNames({
        homeTeamName: match.home.name,
        awayTeamName: match.away.name,
      });
      setNamesOpen(false);
    }
  }, [isOpen, match.home.name, match.away.name]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamNames((prevState) => ({
      ...prevState,
      [e.target.name as keyof TeamNames]: e.target.value,
    }));
  };

  const handleTeamNameUpdate = () => {
    updateTeamName({
      homeTeamName: teamNames.homeTeamName.trim() || "Home",
      awayTeamName: teamNames.awayTeamName.trim() || "Away",
    });
    setIsOpen(false);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  // Close the menu before confirming, so one modal is open at a time and the
  // scoreboard being wiped is visible behind the question.
  const askToReset = () => {
    setIsOpen(false);
    setConfirmReset(true);
  };

  const handleReset = () => {
    resetMatchData();
    setConfirmReset(false);
  };

  const namesUnchanged =
    match.home.name === teamNames.homeTeamName &&
    match.away.name === teamNames.awayTeamName;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <button
          onClick={() => setIsOpen(true)}
          aria-label="More options"
          className={className}
        >
          <Bars3Icon className="size-5" />
        </button>

        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Match options</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            {/* Collapsed by default: the names are set once, so they should not
              take up the menu every time it is opened for dark mode. */}
            <Collapsible open={namesOpen} onOpenChange={setNamesOpen}>
              <CollapsibleTrigger className={`${menuRow} justify-between`}>
                <span className="flex items-center gap-3">
                  <UserGroupIcon className="size-5" />
                  Team names
                </span>
                <ChevronDownIcon
                  className={`size-4 transition-transform ${
                    namesOpen ? "rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>

              <CollapsibleContent className="flex flex-col gap-3 px-3 pt-3 pb-1">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="homeTeamName">Home team name</Label>
                  <Input
                    id="homeTeamName"
                    name="homeTeamName"
                    placeholder="Home"
                    value={teamNames.homeTeamName}
                    onChange={changeName}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="awayTeamName">Away team name</Label>
                  <Input
                    id="awayTeamName"
                    name="awayTeamName"
                    placeholder="Away"
                    value={teamNames.awayTeamName}
                    onChange={changeName}
                  />
                </div>
                <Button
                  className="w-full"
                  disabled={namesUnchanged}
                  onClick={handleTeamNameUpdate}
                >
                  Update names
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="flex flex-col gap-2 border-t border-gray-200 pt-3 dark:border-white/10">
            <DarkModeToggle />
            <button className={menuRow} onClick={toggleFullscreen}>
              {isFullscreen ? (
                <ArrowsPointingInIcon className="size-5" />
              ) : (
                <ArrowsPointingOutIcon className="size-5" />
              )}
              {isFullscreen ? "Exit full screen" : "Full screen"}
            </button>
          </div>

          <div className="flex flex-col gap-2 border-t border-gray-200 pt-3 dark:border-white/10">
            {/* Nothing is lost by leaving: the match stays in local storage and
              the home page offers it back as "Continue Match". */}
            <Link href="/" className={menuRow}>
              <HomeIcon className="size-5" />
              Back to home
            </Link>
            {isBasic && (
              <button
                className={`${menuRow} text-red-600 dark:text-red-400`}
                onClick={askToReset}
              >
                <XCircleIcon className="size-5" />
                Reset match
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmReset} onOpenChange={setConfirmReset}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset this match?</AlertDialogTitle>
            <AlertDialogDescription>
              Scores, sets won and the match history are all cleared. Team names
              are kept. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleReset}>
              Reset match
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MatchMenu;
